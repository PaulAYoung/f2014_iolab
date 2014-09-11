#!/usr/bin/env python

import urllib

from bs4 import BeautifulSoup
import requests
from jinja2 import Template


def get_data(name):
    url = "https://archive.org/details/{}".format(name)
    page = requests.get(url)
    page = BeautifulSoup(page.content)
    keys = page.findAll(attrs={"class": "key"})
    values = page.findAll(attrs={"class": "value"})
    key_vals = dict(
        zip([str(k.text) for k in keys], [str(v.text) for v in values])
        )
    embed = '<iframe src="https://archive.org/embed/{}" ' \
            + 'width="640" height="480" frameborder="0" ' \
            + 'webkitallowfullscreen="true" mozallowfullscreen="true" ' \
            'allowfullscreen></iframe>"'\
            .format(name)
    key_vals["url"] = url
    key_vals["embed"] = embed
    key_vals["name"] = name
    key_vals["link"] = urllib.quote(name.replace(" ", "_"))

    key_vals["producer"] = key_vals["Producer:"]
    del key_vals["Producer:"]
    key_vals["keywords"] = key_vals["Keywords:"]
    del key_vals["Keywords:"]
    key_vals["collection"] = key_vals["This movie is part of the collection:"]
    del key_vals["This movie is part of the collection:"]

    return key_vals

test_data = [
        {
            "name": "Muto",
            "link": "muto",
            "producer": "Blu",
            "embed": """<iframe src="https://archive.org/embed/Muto-animation" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>""",
            "keywords": "animation; blu; stop-motion"
            },
        {
            "name": "Gumbasia",
            "link": "gumbasion",
            "producer": "Art Clokey",
            "embed": """<iframe src="https://archive.org/embed/Gumbasia_331" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>""",
            "keywords": "Art Clokey; Gumby; Stop-motion; Claymation; television"
            },
        {
            "name": "The Ermo Show",
            "link": "theermoshow",
            "producer": "Delaware Based Productions",
            "embed": """<iframe src="https://archive.org/embed/the_ermo_show" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>""",
            "keywords": "Ermo; Puppet; Animation; Stop-Motion; Funny; Cartoon; Beans; Hats; Nathan Smithe (silent e)"
            },
        {
            "name": "Malvin and the Chipdudes!",
            "link": "malvin",
            "producer": "Delaware Based Productions",
            "embed": """<iframe src="https://archive.org/embed/malvin_and_the_chipdudes" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>""",
            "keywords": "Animation; Humor; Stop motion; Clay; Compositing; Cover; Sped up; Speed; Tweak; Bitch"
            },
        {
            "name": "The Mascot - Complete and Uncut",
            "link": "the_mascot",
            "producer": "Ladislas Starewicz",
            "embed": """<iframe src="https://archive.org/embed/The_Mascot_Complete" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>""",
            "keywords": "stop motion, animation, Wladyslaw, Starevich, Starevitch, Starewich, Starewitch, short film, Fetiche, Mascotte, Devil's Ball"
            }
  ]

def main():
    shorts = [
        "Muto-animation",
        "Gumbasia",
        "The Ermo Show",
        "Malvin and the Chipdudes!",
        "The Mascot - Complete and Uncut"
        ]
    data = test_data

    #load templates
    index_template = Template(open("hwhelpers/short_list.html", "r").read())
    item_template = Template(open("hwhelpers/short_item.html", "r").read())

    for d in data:
        print "writing page for {}".format(d["name"])
        out_file = open("./homework-1/{}.html".format(d["link"]), "w")
        out_file.write(item_template.render(d))
        out_file.close()

    print("Writing index")
    index = open("./homework-1/index.html", "w")
    index.write(index_template.render(shorts=data))
    index.close()


if __name__ == '__main__':
    main()
