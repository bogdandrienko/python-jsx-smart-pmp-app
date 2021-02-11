from typing import Callable, List, Optional


class FormattedException(Exception):
    pass

class TemplateParserException(Exception):
    def __init__(self, message: str) -> None:
        self.message = message

    def __str__(self) -> str:
        return self.message

class TokenizationException(Exception):
    def __init__(self, message: str, line_content: Optional[str] = None) -> None:
        self.message = message
        self.line_content = line_content

class TokenizerState:
    def __init__(self) -> None:
        self.i = 0
        self.line = 1
        self.col = 1

class Token:
    def __init__(self, kind: str, s: str, tag: str, line: int, col: int, line_span: int) -> None:
        self.kind = kind
        self.s = s
        self.tag = tag
        self.line = line
        self.col = col
        self.line_span = line_span

def tokenize(text: str) -> List[Token]:
    def advance(n: int) -> None:
        for _ in range(n):
            state.i += 1
            if state.i >= 0 and text[state.i - 1] == '\n':
                state.line += 1
                state.col = 1
            else:
                state.col += 1

    def looking_at(s: str) -> bool:
        return text[state.i:state.i+len(s)] == s

    def looking_at_htmlcomment() -> bool:
        return looking_at("<!--")

    def looking_at_handlebarcomment() -> bool:
        return looking_at("{{!")

    def looking_at_djangocomment() -> bool:
        return looking_at("{#")

    def looking_at_handlebarpartial() -> bool:
        return looking_at("{{>")

    def looking_at_html_start() -> bool:
        return looking_at("<") and not looking_at("</")

    def looking_at_html_end() -> bool:
        return looking_at("</")

    def looking_at_handlebars_start() -> bool:
        return looking_at("{{#") or looking_at("{{^")

    def looking_at_handlebars_end() -> bool:
        return looking_at("{{/")

    def looking_at_django_start() -> bool:
        return looking_at("{% ") and not looking_at("{% end")

    def looking_at_django_end() -> bool:
        return looking_at("{% end")

    def looking_at_jinja2_end_whitespace_stripped() -> bool:
        return looking_at("{%- end")

    def looking_at_jinja2_start_whitespace_stripped_type2() -> bool:
        # This function detects tag like {%- if foo -%}...{% endif %}
        return looking_at("{%-") and not looking_at("{%- end")

    state = TokenizerState()
    tokens = []

    while state.i < len(text):
        try:
            if looking_at_htmlcomment():
                s = get_html_comment(text, state.i)
                tag = s[4:-3]
                kind = 'html_comment'
            elif looking_at_handlebarcomment():
                s = get_handlebar_comment(text, state.i)
                tag = s[3:-2]
                kind = 'handlebar_comment'
            elif looking_at_djangocomment():
                s = get_django_comment(text, state.i)
                tag = s[2:-2]
                kind = 'django_comment'
            elif looking_at_handlebarpartial():
                s = get_handlebar_partial(text, state.i)
                tag = s[9:-2]
                kind = 'handlebars_singleton'
            elif looking_at_html_start():
                s = get_html_tag(text, state.i)
                if s.endswith('/>'):
                    end_offset = -2
                else:
                    end_offset = -1
                tag_parts = s[1:end_offset].split()

                if not tag_parts:
                    raise TemplateParserException("Tag name missing")

                tag = tag_parts[0]

                if is_special_html_tag(s, tag):
                    kind = 'html_special'
                elif is_self_closing_html_tag(s, tag):
                    kind = 'html_singleton'
                else:
                    kind = 'html_start'
            elif looking_at_html_end():
                s = get_html_tag(text, state.i)
                tag = s[2:-1]
                kind = 'html_end'
            elif looking_at_handlebars_start():
                s = get_handlebars_tag(text, state.i)
                tag = s[3:-2].split()[0]
                kind = 'handlebars_start'
            elif looking_at_handlebars_end():
                s = get_handlebars_tag(text, state.i)
                tag = s[3:-2]
                kind = 'handlebars_end'
            elif looking_at_django_start():
                s = get_django_tag(text, state.i)
                tag = s[3:-2].split()[0]
                kind = 'django_start'

                if s[-3] == '-':
                    kind = 'jinja2_whitespace_stripped_start'
            elif looking_at_django_end():
                s = get_django_tag(text, state.i)
                tag = s[6:-3]
                kind = 'django_end'
            elif looking_at_jinja2_end_whitespace_stripped():
                s = get_django_tag(text, state.i)
                tag = s[7:-3]
                kind = 'jinja2_whitespace_stripped_end'
            elif looking_at_jinja2_start_whitespace_stripped_type2():
                s = get_django_tag(text, state.i, stripped=True)
                tag = s[3:-3].split()[0]
                kind = 'jinja2_whitespace_stripped_type2_start'
            else:
                advance(1)
                continue
        except TokenizationException as e:
            raise FormattedException(
                f'''{e.message} at Line {state.line} Col {state.col}:"{e.line_content}"''',
            )

        line_span = len(s.split('\n'))
        token = Token(
            kind=kind,
            s=s,
            tag=tag.strip(),
            line=state.line,
            col=state.col,
            line_span=line_span,
        )
        tokens.append(token)
        advance(len(s))

        def add_pseudo_end_token(kind: str) -> None:
            token = Token(
                kind=kind,
                s='</' + tag + '>',
                tag=tag,
                line=state.line,
                col=state.col,
                line_span=1,
            )
            tokens.append(token)

        if kind == 'html_singleton':
            # Here we insert a Pseudo html_singleton_end tag so as to have
            # ease of detection of end of singleton html tags which might be
            # needed in some cases as with our html pretty printer.
            add_pseudo_end_token('html_singleton_end')
        if kind == 'handlebars_singleton':
            # We insert a pseudo handlbar end tag for singleton cases of
            # handlebars like the partials. This helps in indenting multi line partials.
            add_pseudo_end_token('handlebars_singleton_end')

    return tokens

def validate(fn: Optional[str] = None, text: Optional[str] = None, check_indent: bool = True) -> None:
    assert fn or text

    if fn is None:
        fn = '<in memory file>'

    if text is None:
        with open(fn) as f:
            text = f.read()

    try:
        tokens = tokenize(text)
    except FormattedException as e:
        raise TemplateParserException(f'''
            fn: {fn}
            {e}''')

    class State:
        def __init__(self, func: Callable[[Token], None]) -> None:
            self.depth = 0
            self.matcher = func

    def no_start_tag(token: Token) -> None:
        raise TemplateParserException(f'''
            No start tag
            fn: {fn}
            end tag:
                {token.tag}
                line {token.line}, col {token.col}
            ''')

    state = State(no_start_tag)

    def start_tag_matcher(start_token: Token) -> None:
        state.depth += 1
        start_tag = start_token.tag.strip('~')
        start_line = start_token.line
        start_col = start_token.col

        old_matcher = state.matcher

        def f(end_token: Token) -> None:

            end_tag = end_token.tag.strip('~')
            end_line = end_token.line
            end_col = end_token.col

            if start_tag == 'a':
                max_lines = 3
            else:
                max_lines = 1

            problem = None
            if (start_tag == 'code') and (end_line == start_line + 1):
                problem = 'Code tag is split across two lines.'
            if start_tag != end_tag:
                problem = 'Mismatched tag.'
            elif check_indent and (end_line > start_line + max_lines):
                if end_col != start_col:
                    problem = 'Bad indentation.'
            if problem:
                raise TemplateParserException(f'''
                    fn: {fn}
                    {problem}
                    start:
                        {start_token.s}
                        line {start_line}, col {start_col}
                    end tag:
                        {end_tag}
                        line {end_line}, col {end_col}
                    ''')
            state.matcher = old_matcher
            state.depth -= 1
        state.matcher = f

    for token in tokens:
        kind = token.kind
        tag = token.tag

        if kind == 'html_start':
            start_tag_matcher(token)
        elif kind == 'html_end':
            state.matcher(token)

        elif kind == 'handlebars_start':
            start_tag_matcher(token)
        elif kind == 'handlebars_end':
            state.matcher(token)

        elif kind in {'django_start', 'jinja2_whitespace_stripped_start',
                      'jinja2_whitespace_stripped_type2_start'}:
            if is_django_block_tag(tag):
                start_tag_matcher(token)
        elif kind in {'django_end', 'jinja2_whitespace_stripped_end'}:
            state.matcher(token)

    if state.depth != 0:
        raise TemplateParserException('Missing end tag')

def is_special_html_tag(s: str, tag: str) -> bool:
    return tag in ['link', 'meta', '!DOCTYPE']

OPTIONAL_CLOSING_TAGS = [
    'circle',
    'img',
    'input',
    'path',
    'polygon',
    'stop',
]

def is_self_closing_html_tag(s: str, tag: str) -> bool:
    if s.endswith('/>'):
        if tag in OPTIONAL_CLOSING_TAGS:
            return True
        raise TokenizationException('Singleton tag not allowed', tag)
    self_closing_tag = tag in [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'param',
        'source',
        'track',
        'wbr',
    ]
    if self_closing_tag:
        return True
    return False

def is_django_block_tag(tag: str) -> bool:
    return tag in [
        'autoescape',
        'block',
        'comment',
        'for',
        'if',
        'ifequal',
        'macro',
        'verbatim',
        'blocktrans',
        'trans',
        'raw',
        'with',
    ]

def get_handlebars_tag(text: str, i: int) -> str:
    end = i + 2
    while end < len(text) - 1 and text[end] != '}':
        end += 1
    if text[end] != '}' or text[end+1] != '}':
        raise TokenizationException('Tag missing "}}"', text[i:end+2])
    s = text[i:end+2]
    return s

def get_django_tag(text: str, i: int, stripped: bool = False) -> str:
    end = i + 2
    if stripped:
        end += 1
    while end < len(text) - 1 and text[end] != '%':
        end += 1
    if text[end] != '%' or text[end+1] != '}':
        raise TokenizationException('Tag missing "%}"', text[i:end+2])
    s = text[i:end+2]
    return s

def get_html_tag(text: str, i: int) -> str:
    quote_count = 0
    end = i + 1
    unclosed_end = 0
    while end < len(text) and (text[end] != '>' or quote_count % 2 != 0 and text[end] != '<'):
        if text[end] == '"':
            quote_count += 1
        if not unclosed_end and text[end] == '<':
            unclosed_end = end
        end += 1
    if quote_count % 2 != 0:
        if unclosed_end:
            raise TokenizationException('Unbalanced Quotes', text[i:unclosed_end])
        else:
            raise TokenizationException('Unbalanced Quotes', text[i:end+1])
    if end == len(text) or text[end] != '>':
        raise TokenizationException('Tag missing ">"', text[i:end+1])
    s = text[i:end+1]
    return s

def get_html_comment(text: str, i: int) -> str:
    end = i + 7
    unclosed_end = 0
    while end <= len(text):
        if text[end-3:end] == '-->':
            return text[i:end]
        if not unclosed_end and text[end] == '<':
            unclosed_end = end
        end += 1
    raise TokenizationException('Unclosed comment', text[i:unclosed_end])

def get_handlebar_comment(text: str, i: int) -> str:
    end = i + 5
    unclosed_end = 0
    while end <= len(text):
        if text[end-2:end] == '}}':
            return text[i:end]
        if not unclosed_end and text[end] == '<':
            unclosed_end = end
        end += 1
    raise TokenizationException('Unclosed comment', text[i:unclosed_end])

def get_django_comment(text: str, i: int) -> str:
    end = i + 4
    unclosed_end = 0
    while end <= len(text):
        if text[end-2:end] == '#}':
            return text[i:end]
        if not unclosed_end and text[end] == '<':
            unclosed_end = end
        end += 1
    raise TokenizationException('Unclosed comment', text[i:unclosed_end])

def get_handlebar_partial(text: str, i: int) -> str:
    end = i + 10
    unclosed_end = 0
    while end <= len(text):
        if text[end-2:end] == '}}':
            return text[i:end]
        if not unclosed_end and text[end] == '<':
            unclosed_end = end
        end += 1
    raise TokenizationException('Unclosed partial', text[i:unclosed_end])
