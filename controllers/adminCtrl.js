const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};


// delete doctor
// const deleteDoctor = async (req, res) => {
//   try {
//     const {doctorId} = req.body;
//     const doctor = await doctorModel.findByIdAndRemove(doctorId);
    
//     res.status(200).send({
//       success: true,
//       message: "Doctor deleted successfully",
//       data: doctor,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting doctor",
//       error,
//     });
//   }
// };

const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    // Find the doctor to get associated user ID
    const doctor = await doctorModel.findByIdAndRemove(doctorId);


    // Update the associated user's isDoctor status to false
    const user = await userModel.findByIdAndUpdate(
      doctor.userId,
      { $set: { isDoctor: false } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Doctor deleted successfully",
      data: { doctor, user },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting doctor",
      error,
    });
  }
};


module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  deleteDoctor,
};
