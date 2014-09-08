#!/usr/bin/env python

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

    key_vals["producer"] = key_vals["Producer:"]
    del key_vals["Producer:"]
    key_vals["keywords"] = key_vals["Keywords:"]
    del key_vals["Keywords:"]
    key_vals["collection"] = key_vals["This movie is part of the collection:"]
    del key_vals["This movie is part of the collection:"]

    return key_vals


def main():
    shorts = [
        "Muto-animation"
        ]
    data = []

    #load templates
    index_template = Template(open("hwhelpers/short_list.html", "r").read())
    item_template = Template(open("hwhelpers/short_item.html", "r").read())

    for s in shorts:
        print("Creating file for {}".format(s))
        data.append(get_data(s))
        out_file = open("./homework-1/{}.html".format(s), "w")
        out_file.write(item_template.render(data[-1]))
        out_file.close()

    print("Writing index")
    index = open("./homework-1/index.html")
    index.write(index_template.render(shorts=data))
    index.close()


if __name__ == '__main__':
    main()
