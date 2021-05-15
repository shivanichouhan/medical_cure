const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const UserImgSchema = mongoose.Schema({
    specilization: {
        type: String,
        required: true
    },
    DoctorList: [
        {
            type: ObjectId,
            ref: "Doctor_Registration"
        }
    ]
});

module.exports = mongoose.model('doctor_Specilization', UserImgSchema);



// 1. Covid Related(कोरोना संबंधी) 
// 2. Medicine(बीपी, शुगर, थायराइड) 
// 3. Orthopedics( हड्डी रोग) 
// 4. Gynecology( महिला एवं प्रसूति रोग) 
// 5. Pediatrics( शिशु एवं बाल रोग) 
// 6. Surgery(सर्जरी विभाग) 
// 7. Dermatology(चर्म रोग)
// 8. Ear, Nose and Throat ( कान, नाक, गला) 
// 9. Opthalmology (नेत्र रोग) 
// 10. Dental (दंत रोग)