const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./models/Contact');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB...');

        try {
            const messages = await Contact.find().sort({ createdAt: -1 });
            console.log(`\nFound ${messages.length} messages:\n`);

            messages.forEach((msg, i) => {
                console.log(`${i + 1}. From: ${msg.name} (${msg.email})`);
                console.log(`   Subject: ${msg.subject}`);
                console.log(`   Message: ${msg.message}`);
                console.log(`   Date: ${msg.createdAt}`);
                console.log('-----------------------------------');
            });

        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error('Connection error:', err));
