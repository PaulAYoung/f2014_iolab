declare namespace html = "http://www.w3.org/1999/xhtml";
declare namespace s = "http://www.ibiblio.org/xml/examples/shakespeare/";

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Plays</title>
    </head>
      <body>
        <h1>Shakespeare's Plays</h1>
          <ul>
              {
              for $li in /html:ul/html:li
                let $href := fn:string($li/html:a/@href),
                    $base := fn:substring-before($href,'.xml'),
                    $play := doc(resolve-uri($href,base-uri(/)))
                return <li><a href="{$base}/">{fn:string($play/s:PLAY/s:TITLE)}</a></li>
              }
          </ul>
      </body>
</html>