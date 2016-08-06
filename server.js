var express = require("express"),
    app = express(),
    cors = require('cors'),
    faker = require('faker');

app.use(cors());

var speakers = [],
    talks = [],
    talk,
    speakerId,
    talkId,
    i;

function generateSpeakersAndTalks () {
    for(i = 0; i < 10; i++) {
        speakerId = faker.random.uuid();

        speaker = {
            id: speakerId,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            summary: faker.lorem.sentences(5),
            talks: []
        };

        talk = generateTalk(speaker);
        talks.push(talk);

        talk = generateTalk(speaker);
        talks.push(talk);
        
        speakers.push(speaker);
    }   
}

function generateTalk (speaker) {
    talkId = faker.random.uuid();

    speaker.talks.push(talkId);

    return {
        id: talkId,
        title: "talk "+ talkId,
        date: faker.date.future(),
        summary: faker.lorem.sentences(3),
        speaker: speaker.id
    };
}

generateSpeakersAndTalks();

app.get("/speakers", function (req, res) {
    res.send({
        speakers: speakers,
        talks: talks
    });
});

app.get("/speakers/:id", function (req, res) {
    var id = req.params["id"],
        speaker = speakers.filter(function (item) {
            return item.id === id;
        });

    speaker = speaker[0];

    res.send({
        speaker: speaker,
        talks: talks
    });
});

app.listen(3000, function () {
    console.log("Express App listening on port 3000");
})