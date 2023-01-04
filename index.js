const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const {v4: uuid} = require("uuid");

const app = express();

app.use(express.json())



app.get('/api/clubs',(req,res) => {

  const Drivers = ["Titleist","Callaway","Taylormade","Mizuno","Ping"]
  const Irons = ["Titleist","Callaway","Taylormade","Mizuno","Ping"]
  const Wedges = ["Bob Vokey","Callaway","Taylormade","Mizuno","Ping"]
  const Putters = ["Scotty Cameron","Callaway","Taylormade","Mizuno","Ping"]
  const Balls = ["Titleist","Callaway","Taylormade","Mizuno","Ping"]

  res.json({
      Driver: _.sample(Drivers),
      Irons: _.sample(Irons),
      Wedges: _.sample(Wedges),
      Putter: _.sample(Putters),
      Ball: _.sample(Balls)
  })
})

app.get('/api/comments/:id', async (req,res) => {
    const id = req.params.id;
    let content;
    try {
content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch (err) {
res.send(`no comment with id: ${id} found`)
    }
    res.json({
        content
    })
})

app.post('/api/comments', async (req,res) => {
const id = uuid();
console.log(id);
const content = req.body.content;
console.log('comment received')
if(!content) {
  return   res.sendStatus(400)
}

await fs.mkdir('data/comments', {recursive: true});
await fs.writeFile(`data/comments/${id}.txt`,content)

res.status(201).json({
    id:id
});

})
app.listen(3000, () => {
    console.log('api running...')
})