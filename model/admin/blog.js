const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogSchema = new schema(
    {
       name:{
           type:String
       },
       blog_img:{
           type:Array
       },
       blog_cat_name:{
           type:String
       },
       blog_sub_cat:{
           type:String
       },
       discription:{
           type:String
       },
       status:{
           type:String,
       }
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('blog', blogSchema)
// var vals = document.getElementById("blog_category").value;
//         console.log(vals)
//         alert(vals);
//         <% data.forEach(element => {%>
//           if(vals == <%=element.blog_cat_name%>){
//               <%=data1 = element.blog_subcategory%>
//               <%data1.forEach((item2)=>{%>
//                   alert(<%=item2%>)
//                 $('#blog_sub_cat').append(`<option value="${<%=item2.blog_sub_cat%>}"> 
//                                        ${<%=item2.blog_sub_cat%>} 
//                                   </option>`);
//               <%})%>
            
//             alert("sssssssssss")
//           }else{
//           alert(<%=element.blog_cat_name%>)
//           }
//     <%})%>