async function userLogoutController(req,res){
  try {
    res.cookie("token", "",{expiresIn:new Date(Date.now())})
    res.json({
      message : "Logout Successfully",
      error: false,
      success: true,
      data : []
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export { userLogoutController };