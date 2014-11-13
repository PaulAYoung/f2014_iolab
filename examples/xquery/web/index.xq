declare namespace html = "http://www.w3.org/1999/xhtml";
declare namespace my = "http://www.example.com";

declare function my:title($e as node()) as xs:string {
    $e/PLAY/TITLE
};

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Plays</title>
    </head>
      <body>
          <div>
              {
              for $li in /html:ul/html:li
                return <p>{my:title(doc(resolve-uri($li/html:a/@href,base-uri(/))))}</p>
              }
          </div>
      </body>
</html>