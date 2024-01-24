import ActiveDirectory from "activedirectory"

const adConfig = {
  url: "WIN-V4H61O65FIJ.test.local",
  baseDN: "DC=test,DC=local",
  username: "noussaier.b@test.local",
  password: "Aezakmi@123456",
};
export const ad = new ActiveDirectory(adConfig);
