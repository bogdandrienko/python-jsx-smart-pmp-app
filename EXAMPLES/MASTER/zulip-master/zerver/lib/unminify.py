import os
import re
from typing import Dict, List

import sourcemap

from zerver.lib.pysa import mark_sanitized


class SourceMap:
    '''Map (line, column) pairs from generated to source file.'''

    def __init__(self, sourcemap_dirs: List[str]) -> None:
        self._dirs = sourcemap_dirs
        self._indices: Dict[str, sourcemap.SourceMapDecoder] = {}

    def _index_for(self, minified_src: str) -> sourcemap.SourceMapDecoder:
        '''Return the source map index for minified_src, loading it if not
           already loaded.'''

        # Prevent path traversal
        assert ".." not in minified_src and "/" not in minified_src

        if minified_src not in self._indices:
            for source_dir in self._dirs:
                filename = os.path.join(source_dir, minified_src + '.map')
                if os.path.isfile(filename):
                    # Use 'mark_sanitized' to force Pysa to ignore the fact that
                    # 'filename' is user controlled. While putting user
                    # controlled data into a filesystem operation is bad, in
                    # this case it's benign because 'filename' can't traverse
                    # directories outside of the pre-configured 'sourcemap_dirs'
                    # (due to the above assertions) and will always end in
                    # '.map'. Additionally, the result of this function is used
                    # for error logging and not returned to the user, so
                    # controlling the loaded file would not be useful to an
                    # attacker.
                    with open(mark_sanitized(filename)) as fp:
                        self._indices[minified_src] = sourcemap.load(fp)
                        break

        return self._indices[minified_src]

    def annotate_stacktrace(self, stacktrace: str) -> str:
        out: str = ''
        for ln in stacktrace.splitlines():
            out += ln + '\n'
            match = re.search(r'/static/webpack-bundles/([^:]+):(\d+):(\d+)', ln)
            if match:
                # Get the appropriate source map for the minified file.
                minified_src = match.groups()[0]
                index = self._index_for(minified_src)

                gen_line, gen_col = list(map(int, match.groups()[1:3]))
                # The sourcemap lib is 0-based, so subtract 1 from line and col.
                try:
                    result = index.lookup(line=gen_line-1, column=gen_col-1)
                    display_src = result.src
                    if display_src is not None:
                        webpack_prefix = "webpack:///"
                        if display_src.startswith(webpack_prefix):
                            display_src = display_src[len(webpack_prefix):]
                        out += f'       = {display_src} line {result.src_line+1} column {result.src_col+1}\n'
                except IndexError:
                    out += '       [Unable to look up in source map]\n'

            if ln.startswith('    at'):
                out += '\n'
        return out
