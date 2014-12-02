declare namespace s = "http://www.ibiblio.org/xml/examples/shakespeare/";

<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
 <link src="/resources/site.css" />
<title>{string(/s:PLAY/s:TITLE)}</title>
 </head>
 
 
 <body>
    <div>
        <h1>{string(/s:PLAY/s:TITLE)}</h1>
        <br/><a href="/">Return to list</a>
        <h2>Dramatis Peoples</h2>
        {
           for $person in /s:PLAY/s:PERSONAE/s:PERSONA
               return <div>{string($person)}</div>
        }
        {
           for $group in /s:PLAY/s:PERSONAE/s:PGROUP
               return <div>{ $group/s:GRPDESCR }</div>
               {
                 for $person in $group/s:PERSONA
                      return <div>{string($person)}</div>
               }
        }
        {
            for $act in /s:PLAY/s:ACT
                return <div><h2>{string($act/s:TITLE)}</h2>
                {
                    for $scene in $act/s:SCENE
                    for $speech in $scene/s:SPEECH
                    for $line in $speech/s:LINE
                    return <p>{string($line)}</p>
                }
            </div>
        }
    </div>
 </body>
 </html>