/*
* Defines the structure for an entry  
*/

export class Entry {
    tstamp: string;
    url: string;
    title: string;
    author: string; 
    brief: string;
    body: string;
    source: string;
    tag: string[];
    company: string;

    constructor(res:any) {
        this.tstamp = res.tstamp;
        this.url = res.url;
        this.title = res.title;
        this.author = res.author;
        this.brief = res.brief;
        this.body = res.body;
        this.source = res.source;
        this.tag = res.tag;
        this.company = res.company;
    }
}

