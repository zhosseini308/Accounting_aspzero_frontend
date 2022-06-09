
SET mypath=%~dp0

CD /D %mypath:~0,-1%

call yarn install

call xcopy initFolder\ngx-bootstrap  node_modules\ngx-bootstrap  /s/h/e/k/f/c/Y

call xcopy initFolder\@ahmed757  node_modules\@ahmed757  /s/h/e/k/f/c/Y

call yarn run create-dynamic-bundles

call copy initFolder\Abp.AspNetZeroCore.dll "%userprofile%\.nuget\packages\abp.aspnetzerocore\3.0.0\lib\net5.0\"  


call yarn start
