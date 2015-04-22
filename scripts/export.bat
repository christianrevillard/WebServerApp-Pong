xcopy "%1..\..\Apps\Pong\Pong\Client" "%1Pong\Client" /Y /I /S
xcopy "%1..\..\Apps\Pong\Pong\Server" "%1Pong\Server" /Y /I /S
xcopy "%1..\..\Apps\Pong\Lib\Client" "%1Lib\Client" /Y /I /S /EXCLUDE:%2
