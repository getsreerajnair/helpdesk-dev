const {db} = require('../util/admin')

exports.getAllRequests = (req,res)=>{
    db.
    collection('Requests')
    .orderBy('createdAt','desc')
    .get()
    .then(
        data =>{
        let requests = []
        data.forEach(doc => {
            requests.push({
                requestId: doc.data().id,
                user:doc.data().user,
                description:doc.data().description,
                type:doc.data().type,
                createdAt:doc.data().createdAt,
                status:doc.data().status
            });
        });
        return res.json(requests);
    })
    .catch(err=> console.error(err));   
}

exports.createNewRequest = (req,res)=>{
    const newRequest = {
        user:req.body.user,
        description:req.body.description,
        type:req.body.type,
        assignedCompany: req.body.assignedCompany,
        assignedUser:req.body.assignedUser,
        status:'Created',
        createdAt:new Date().toISOString(),
    };

    db.collection('Requests')
    .add(newRequest)
    .then(doc =>res.json({message: `document ${doc.id}  has been created`}))
    .catch(err => res.status(500).json({error:'something went wrong'}))
}