const Contact = require('../models/Contact');

// Submit contact form
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Create new contact submission
        const contact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        await contact.save();

        // In production, send email notification to admin here
        console.log('New contact form submission:', contact);

        res.status(201).json({ 
            msg: 'Your message has been sent successfully! We will get back to you soon.',
            contact 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get all contact submissions (Admin only)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ submittedAt: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Update contact status (Admin only)
exports.updateContactStatus = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;

        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        if (status) contact.status = status;
        if (adminNotes !== undefined) contact.adminNotes = adminNotes;

        await contact.save();
        res.json({ msg: 'Contact updated successfully', contact });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete contact submission (Admin only)
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        await Contact.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Contact deleted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
