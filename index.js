const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '?';

var version = ('1.2.0')

const cheerio = require('cheerio');

const request = require('request');

const token = 'NjQxNzM4NTg0ODA1ODY3NTQw.XcMwGA.dV05wilzG6H4zvPBb0Sddczt67Q';

bot.on('ready',() =>{
    console.log('Matt_Mercer has Decended');
    bot.user.setActivity('Dungeons and Dragons');
})

bot.on('message', message => {
 
    let args = message.content.substring(prefix.length).split(" ");
 
    switch (args[0]) {
        case 'D20':
        image(message);
        break;

        case 'D100':
         message.channel.sendMessage('How Do Want To Do This?')
        break;

        case 'D4':
            const info = new Discord.RichEmbed()
            .setTitle('Matt Mercer/Critical Role Bot')
            .addField('Your Name Is' , message.author.username)
            .addField('Version', version)
            .setColor (0x800000)
            .setThumbnail('https://66.media.tumblr.com/abf683459e28af1e14706bdb8fcc3d59/tumblr_p67h0j6Wsb1tef5jfo3_500.png')
            .setFooter('Type in D20 and D100 to see what happens!')
        message.channel.sendEmbed(info)
        break;
        case 'jester':
            message.react("🍭");
        break;
        
    }
 
});

 
function image(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "critical role fanart",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 
 
 
 
 
 
 
 
}





bot.login(token);
