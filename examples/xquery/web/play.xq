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
        <br/>
        {
           for $group in /s:PLAY/s:PERSONAE/s:PGROUP
               return
                    <div>{ string($group/s:GRPDESCR) }:
                    <ul>
                    {
                      for $person in $group/s:PERSONA
                           return <li>{string($person)}</li>
                    }
                    </ul>
                    </div>
        }
        {
            for $act in /s:PLAY/s:ACT
                return <div><h2>{string($act/s:TITLE)}</h2>
                {
                    for $scene in $act/s:SCENE
                    return
                        <div class="scene">
                            <h3>{string($scene/s:TITLE)}</h3>
                            {
                            for $stagedir in $scene/s:STAGEDIR
                                return <p class="stagedir">{string($stagedir)}</p>
                            }
                            <div class="speaches">
                                {
                                for $speech in $scene/s:SPEECH
                                    return 
                                        <div class="speech">
                                            {
                                            for $speaker in $speech/s:SPEAKER
                                                return <span class="speaker">{string($speaker)}:</span>
                                            }
                                            <div class="lines">
                                                {
                                                for $line in $speech/s:LINE
                                                    return <p class="line">{string($line)}</p>
                                                }
                                            </div>
                                        <br/>
                                        </div>
                                }
                            </div>
                        </div>
                        
                }
            </div>
        }
    </div>
 </body>
 </html>