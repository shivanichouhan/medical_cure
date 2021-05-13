// {
//     medicine: [
//       {
//         _id: 609a739221fda85f27e2ba37,
//         patId: '605ebed767359f123cb168d2',
//         docId: '605de7ab1961f379c0534323',
//         medicine: 'revital',
//         dosage: '4',
//         duration: '2week',
//         med_instruction: 'demo',
//         __v: 0
//       },
//       {
//         _id: 609a739f21fda85f27e2ba38,
//         patId: '605ebed767359f123cb168d2',
//         docId: '605de7ab1961f379c0534323',
//         medicine: 'disprine',
//         dosage: '2',
//         duration: '1week',
//         med_instruction: 'demo',
//         __v: 0
//       }
//     ],
//     lab_test: [
//       {
//         _id: 609a73b221fda85f27e2ba39,
//         patId: '605ebed767359f123cb168d2',
//         docId: '605de7ab1961f379c0534323',
//         lab_test: 'pethology',
//         lab_instruction: 'test inst',
//         __v: 0
//       }
//     ],
//     _id: 609b73550c971a428fceb9fa,
//     daignosis: 'A009    Cholera, unspecified',
//     alergies: 'test',
//     dr_advice: 'demo',
//     follow_up: '21/10/2021'
//   }


//   patinfo {
//     patient_img: 'http://res.cloudinary.com/dha2sjb75/image/upload/v1616822061/patient/1616822058694.png',
//     mob_verify: true,
//     Appoinment: [],
//     prescription: [],
//     _id: 605ebed767359f123cb168d2,
//     patient_name: 'Ravi gupta',
//     mobile: '7000121614',
//     health_worker_id: '605dedc6d3d22303aeda9d21',
//     patient_id: '605ebed767359f123cb168d2',
//     otp: '',
//     createdAt: 2021-03-27T05:12:55.211Z,
//     updatedAt: 2021-05-05T04:58:07.096Z,
//     __v: 0,
//     age: '21',
//     gender: 'Male',
//     height: '5.5',
//     p_reg: true,
//     weight: '55',
//     disease: 'Arthritis',
//     doctor_id: '6068453d8a864506bebe73f9',
//     status: 'appoint_requested',
//     disease_id: null
//   }

  
//   docInfo { Course: 'bsc', _id: 605de7ab1961f379c0534323, username: 'ab' }
var str = 'SMS-SHOOT-ID/9621016427609cb86e4ece9'

if(str.match(/SMS-SHOOT-ID/g)){
  console.log('match')
}else{
  console.log('not match')
}