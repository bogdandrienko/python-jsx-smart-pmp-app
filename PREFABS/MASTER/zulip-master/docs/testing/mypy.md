# Python static type checker (mypy)

[mypy](http://mypy-lang.org/) is a compile-time static type checker
for Python, allowing optional, gradual typing of Python code.  Zulip
was fully annotated with mypy's Python 2 syntax in 2016, before our
migration to Python 3 in late 2017.  In 2018 and 2020, we migrated
essentially the entire codebase to the nice PEP 484 (Python 3 only)
and PEP 526 (Python 3.6) syntax for static types:

```
user_dict: Dict[str, UserProfile] = {}

def get_user(email: str, realm: Realm) -> UserProfile:
    ... # Actual code of the function here
```

You can learn more about it at:

* The
  [mypy cheat sheet for Python 3](https://mypy.readthedocs.io/en/latest/cheat_sheet_py3.html)
  is the best resource for quickly understanding how to write the PEP
  484 type annotations used by mypy correctly.  The
  [Python 2 cheat sheet](https://mypy.readthedocs.io/en/latest/cheat_sheet.html)
  is useful for understanding the type comment syntax needed for our
  few modules that need to support both Python 2 and 3.

* The
  [Python type annotation spec in PEP 484](https://www.python.org/dev/peps/pep-0484/)

* Our [blog post on being an early adopter of mypy][mypy-blog-post] from 2016.

The mypy type checker is run automatically as part of Zulip's Travis
CI testing process in the `backend` build.

[mypy-blog-post]: https://blog.zulip.org/2016/10/13/static-types-in-python-oh-mypy/

## Installing mypy

mypy is installed by default in the Zulip development environment.  If
you'd like to install just the version of `mypy` that we're using
(useful if e.g. you want `mypy` installed on your laptop outside the
Vagrant guest), you can do that with `pip install -r
requirements/mypy.txt`.

## Running mypy on Zulip's code locally

To run mypy on Zulip's python code, you can run the command:

    tools/run-mypy

Mypy outputs errors in the same style as a compiler would.  For
example, if your code has a type error like this:

```
foo = 1
foo = '1'
```

you'll get an error like this:

```
test.py: note: In function "test":
test.py:200: error: Incompatible types in assignment (expression has type "str", variable has type "int")
```

## Mypy is there to find bugs in Zulip before they impact users

For the purposes of Zulip development, you can treat `mypy` like a
much more powerful linter that can catch a wide range of bugs.  If,
after running `tools/run-mypy` on your Zulip branch, you get mypy
errors, it's important to get to the bottom of the issue, not just do
something quick to silence the warnings, before we merge the changes.
Possible explanations include:

* A bug in any new type annotations you added.
* A bug in the existing type annotations.
* A bug in Zulip!
* Some Zulip code is correct but confusingly reuses variables with
  different types.
* A bug in mypy (though this is increasingly rare as mypy is now
  fairly mature as a project).

Each explanation has its own solution, but in every case the result
should be solving the mypy warning in a way that makes the Zulip
codebase better.  If you're having trouble, silence the warning with
an `Any` or `# type: ignore[code]` so you're not blocked waiting for help,
add a `# TODO: ` comment so it doesn't get forgotten in code review,
and ask for help in chat.zulip.org.

## Mypy stubs for third-party modules

For the Python standard library and some popular third-party modules,
the [typeshed project](https://github.com/python/typeshed) has
[stubs](https://github.com/python/mypy/wiki/Creating-Stubs-For-Python-Modules),
basically the equivalent of C header files defining the types used in
these Python APIs.

For other third-party modules that we call from Zulip, one either
needs to add an `ignore_missing_imports` entry in `mypy.ini` in the
root of the project, letting `mypy` know that it's third-party code,
or add type stubs to the `stubs/` directory, which has type stubs that
mypy can use to type-check calls into that third-party module.

It's easy to add new stubs!  Just read the docs, look at some of
existing examples to see how they work, and remember to remove the
`ignore_missing_imports` entry in `mypy.ini` when you add them.

For any third-party modules that don't have stubs, `mypy` treats
everything in the third-party module as an `Any`, which is the right
model (one certainly wouldn't want to need stubs for everything just
to use `mypy`!), but means the code can't be fully type-checked.

## `type_debug.py`

`zerver/lib/type_debug.py` has a useful decorator `print_types`.  It
prints the types of the parameters of the decorated function and the
return type whenever that function is called.  This can help find out
what parameter types a function is supposed to accept, or if
parameters with the wrong types are being passed to a function.

Here is an example using the interactive console:

```
>>> from zerver.lib.type_debug import print_types
>>>
>>> @print_types
... def func(x, y):
...     return x + y
...
>>> func(1.0, 2)
func(float, int) -> float
3.0
>>> func('a', 'b')
func(str, str) -> str
'ab'
>>> func((1, 2), (3,))
func((int, int), (int,)) -> (int, int, int)
(1, 2, 3)
>>> func([1, 2, 3], [4, 5, 6, 7])
func([int, ...], [int, ...]) -> [int, ...]
[1, 2, 3, 4, 5, 6, 7]
```

`print_all` prints the type of the first item of lists.  So `[int, ...]` represents
a list whose first element's type is `int`.  Types of all items are not printed
because a list can have many elements, which would make the output too large.

Similarly in dicts, one key's type and the corresponding value's type are printed.
So `{1: 'a', 2: 'b', 3: 'c'}` will be printed as `{int: str, ...}`.

## Using @overload to accurately describe variations

Sometimes, a function's type is most precisely expressed as a few
possibilities, and which possibility can be determined by looking at
the arguments.  You can express that idea in a way mypy understands
using `@overload`.  For example, `check_list` returns a `Validator`
function that verifies that an object is a list, raising an exception
if it isn't.

It supports being passed a `sub_validator`, which will verify that
each element in the list has a given type as well.  One can express
the idea "If `sub_validator` validates that something is a `ResultT`,
`check_list(sub_validator)` validators that something is a
`List[ResultT]` as follows:

~~~ py
@overload
def check_list(sub_validator: None, length: Optional[int]=None) -> Validator[List[object]]:
    ...
@overload
def check_list(sub_validator: Validator[ResultT],
               length: Optional[int]=None) -> Validator[List[ResultT]]:
    ...
def check_list(sub_validator: Optional[Validator[ResultT]]=None,
               length: Optional[int]=None) -> Validator[List[ResultT]]:
~~~

The first overload expresses the types for the case where no
`sub_validator` is passed, in which case all we know is that it
returns a `Validator[List[object]]`; whereas the second defines the
type logic for the case where we are passed a `sub_validator`.

See the [mypy overloading documentation][mypy-overloads] for more details.

[mypy-overloads]: https://mypy.readthedocs.io/en/stable/more_types.html#function-overloading

## Troubleshooting advice

All of our linters, including mypy, are designed to only check files
that have been added in git (this is by design, since it means you
have untracked files in your Zulip checkout safely).  So if you get a
`mypy` error like this after adding a new file that is referenced by
the existing codebase:

```
mypy | zerver/models.py:1234: note: Import of 'zerver.lib.markdown_wrappers' ignored
mypy | zerver/models.py:1234: note: (Using --follow-imports=error, module not passed on command line)
```

The problem is that you need to `git add` the new file.
