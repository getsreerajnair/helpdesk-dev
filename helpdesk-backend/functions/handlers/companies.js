const {db} = require('../util/admin')

exports.getAllCompanies = (req,res)=>{
    db.
    collection('companies')
    .get()
    .then(
        data =>{
        let companies = []
        
        
        data.forEach(doc => {
            companies.push(
                doc.data().company_name.forEach(company =>{
                    companies.push(company)
                })
            );
        });
        console.log(companies)
        return res.json(companies);
    })
    .catch(err=> console.error(err));   
}