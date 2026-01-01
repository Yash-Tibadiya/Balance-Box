// 1. Just event name
sendEvent("view_login_page");

// 2. With properties
sendEvent("button_clicked", { 
  buttonName: "signup", 
  page: "home" 
});

// 3. With user data
sendEvent("new_user_created", {
  userId: user.id,
  email: user.email,
  name: user.name,
});