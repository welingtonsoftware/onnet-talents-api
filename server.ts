import express from "express";
const app = express();
const cors = require('cors');
const applicantRouter = require('./src/routes/applicant');
const documentRouter = require('./src/routes/document');
const functionRouter = require('./src/routes/function');
const sectorRouter = require('./src/routes/sector');
const locationRouter = require('./src/routes/location');
const cityRouter = require('./src/routes/city');
const neighborhoodRouter = require('./src/routes/neighborhood');
const addressRouter = require('./src/routes/address');
const stageRouter = require('./src/routes/stage');
const searchRouter = require('./src/routes/search');
const interviewRouter = require('./src/routes/interview');
const questRouter = require('./src/routes/quest');
const searchQuestRouter = require('./src/routes/searchQuest');
const answerRouter = require('./src/routes/answer');
const path = require('path');

app.use(cors());

app.use(express.json());

app.use('/applicant', applicantRouter);
app.use('/document', documentRouter);
app.use('/function', functionRouter);
app.use('/sector', sectorRouter);
app.use('/location', locationRouter);
app.use('/city', cityRouter);
app.use('/neighborhood', neighborhoodRouter);
app.use('/address', addressRouter);
app.use('/stage', stageRouter);
app.use('/search', searchRouter);
app.use('/interview', interviewRouter);
app.use('/quest', questRouter);
app.use('/searchQuest', searchQuestRouter);
app.use('/answer', answerRouter);


app.use('/uploads',
express.static(path.join(__dirname,'uploads')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});


