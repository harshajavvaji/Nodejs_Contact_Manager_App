// create functions and import and export 
const asyncHandler = require("express-async-handler");

const contact = require("../models/contactmodel")

//des Get all contacts
//route /api/contacts
//access private

const getContacts = asyncHandler(async (req,res) =>{
    // const Contact = await contact.find({user_id : req.user.id})
    const Contact = await contact.find({user_id : req.user.id})
    res.status(200).json(Contact)
});

//des Create New contact
//route POST /api/contacts
//access private
const CreateContact = asyncHandler(async (req,res) =>{
    console.log("The request body is ", req.body)
    const{name,mail,phone} = req.body;
    if(!name || !mail || !phone ){
        res.status(400);
        throw new Error('All fields are Mandatory');
    }
    var Contact= new contact({
        name: name,
        mail:mail,
        phone:phone,
        user_id : req.user.id
    })
      
    Contact.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    })
    res.status(201).json(Contact)
});

//des Create New contact
//route Get /api/contacts/:id
//access private
const getContact = asyncHandler(async (req,res) =>{
    const Contact = await contact.findById(req.params.id)
    if(!Contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(202).json(Contact)
});

//des Create New contact
//route Put /api/contacts/:id
//access private
const updateContact = asyncHandler(async (req,res) =>{
    const Contact = await contact.findById(req.params.id)
    if(!Contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(Contact.user_id.toString() !== req.user.id){
        res.status(404)
        throw new Error("User dont have permission to update other users contacts")
    }

    const updatedcontact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true }
    )
    res.status(200).json(updatedcontact)
});

//des Delete contact
//route delete /api/contacts/:id
//access private
const deleteContact = asyncHandler(async (req,res) =>{
    const Contact = await contact.findById(req.params.id)
    if(!Contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(Contact.user_id.toString() !== req.user.id){
        res.status(404)
        throw new Error("User don't have permission to update other users contacts")
    }
    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(deleteContact)
});

module.exports = {getContact,CreateContact,getContacts,updateContact,deleteContact};