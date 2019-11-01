import axios from "axios";
import { User } from "@/models/user.model";
import { URIProperty } from "@/shared/properties/URIProperty";

export class UserSevices {
  public getUser(params: any) {
    const url = URIProperty.getUserIncharge(params);
    const response = axios.get(url);
    return response;
  }
  public addUser(user: User) {
    const url = URIProperty.addUser();
    const response = axios.post(url, user);
    return response;
  }
  public UpdateUser(params: any) {
    const url = URIProperty.addUser();
    const response = axios.put(url, params);
    return response;
  }

  public GetUserByCode(params: any) {
    const url = URIProperty.getUserByCode(params);
    const response = axios.get(url);
    return response;
  }

  public DeleteUser(params: any) {
    const url = URIProperty.addUser();
    const response = axios.delete(url, { data: params });
    return response;
  }
}
