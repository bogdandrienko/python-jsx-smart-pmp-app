rmdir /Q /S test

rename build test

cd ..\

mkdir react

rmdir /Q /S react\test

move frontend_test\test react\test
