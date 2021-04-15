const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const { catchAll, notFound } = require('./error/error');
const healthcareproviderRouter = require('./router/Healthcareprovider/healthcareproviders');
const sessionRouter = require('./router/Healthcareprovider/sessionproviders');
const healthcareserviceproviderRouter = require('./router/Healthcareserviceprovider/healthcareserviceproviders');
const practitionerRouter = require('./router/Practitioner/practitioners');
const scheduleRouter = require('./router/Schedules/schedules');
const bookingRouter = require('./router/Booking/bookings');
const patientRouter = require('./router/Patient/patients');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'It works!!!' });
});

app.use('/healthcareproviders', healthcareproviderRouter);
app.use('/authprovider', sessionRouter);
app.use('/healthcareserviceproviders', healthcareserviceproviderRouter);
app.use('/practitioners', practitionerRouter);
app.use('/schedules', scheduleRouter);
app.use('/bookings', bookingRouter);
app.use('/patients', patientRouter);

app.use(notFound);
app.use(catchAll);

module.exports = app;