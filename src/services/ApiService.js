import axios from "axios";
// const BASE_URL = 'https://lsi-employeetracker.herokuapp.com'; // heruko.

// const BASE_URL = "http://18.209.60.4:8080/LESM-Status-Monitor-0.0.1-SNAPSHOT"; // devops
// const BASE_URL = "http://18.212.4.30:8080/LESM-Status-Monitor-0.0.1-SNAPSHOT";

//  const BASE_URL = "http://10.81.4.23:2020"; //server port

// const BASE_URL = "http://10.81.4.23:9090/LESM-Status-Monitor123";

// const BASE_URL = "http://18.212.4.30:8080/LESM-Status-Monitor-0.0.1-SNAPSHOT"; // NEW ONE DEVOPS API
// const BASE_URL = "http://localhost:2020";
// const BASE_URL = "http://10.81.4.191:2030"; // sudheer pc
//  const BASE_URL = "http://10.81.4.23:2030"; // server pc
//const BASE_URL = "http://localhost:2032"
// const BASE_URL = "http://localhost:2020"; //umer pc
const BASE_URL = "http://10.81.4.89:2020";
//sowmya pc
// const BASE_URL = "http://10.81.4.197:2021"; // chamu pc
// const BASE_URL = "http://10.81.3.30:9090"; // charan pc
// const BASE_URL = "http://10.81.4.198:2025" //sowmya pc
//const  BASE_URL="http://10.81.4.188:2021";  //santhosh pc
//  const BASE_URL = "http://10.81.4.231:2022"; //teju pc
//get
const ALL_EMPLOYEES = `${BASE_URL}/api/v1/emp/getEmps`;
const ALL_EMPLOYEES_BY_ID = `${BASE_URL}/api/v1/emp/get-emp-crosspnd-details?id=`;
// const ALL_EMPLOYEES_BY_ID = `${BASE_URL}/api/v1/emp/details?empId=`;

const EMPLOYEE_TYPE = `${BASE_URL}/api/v1/fields/get-all-empTypes`;
//post
const LOGIN_API_URL = `${BASE_URL}/api/v1/auth/login`;
// const REGISTER_API_URL = `${BASE_URL}/api/register`;
const INSERT_EMP_DETAILS_API_URL = `${BASE_URL}/api/v1/emp/insert-emp-details`;
const TEST = `${BASE_URL}/api/v1/admin/create-roles`;
const BILL_EXPENSE = `${BASE_URL}/api/v1/exp/insert-expenses`;

//delete

export function auth() {
  const token = sessionStorage.getItem("Access_Token");
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

export default new (class ApiService {
  login(data) {
    return axios.post(LOGIN_API_URL, data);
  }

  // register(data) {
  //   return axios.post(REGISTER_API_URL, data);
  // }
  insertEmployee(data, primaryMgr, technology) {
    return axios.post(
      `${INSERT_EMP_DETAILS_API_URL}?addressTypeId=${data.addTypeId}&departId=${data.departId}&desgId=${data.desgId}&subDepartId=${data.subDepartId}&subVId=${primaryMgr}&technology1Id=${data.technology}&typeId=${data.empTypeId}`,
      data,
      auth()
    );
  }
  updateEmployee(data, id) {
    return axios.put(
      `${BASE_URL}/api/v1/emp/update-emp?id=${id}`,
      data,
      auth()
    );
  }

  getAllEmployees() {
    return axios.get(ALL_EMPLOYEES, auth());
  }
  getEmployeeforUpdate(id) {
    return axios.get(`${BASE_URL}/api/v1/emp/update-emp-req?id=${id}`, auth());
  }
  getEmployeeById(id) {
    return axios.get(`${BASE_URL}/api/v1/emp/details?empId=${id}`, auth());
  }
  getTest(data) {
    return axios.post(TEST, data);
  }
  getBillExpense(data, id, typeId) {
    return axios.post(
      `${BILL_EXPENSE}?empId=${id}&expTypeId=${typeId}`,
      data,
      auth()
    );
  }
  empType() {
    return axios.get(EMPLOYEE_TYPE, auth());
  }
  //addEmployee
  getAllDesg() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-desg`, auth());
  }

  // http://localhost:2022/api/v1/drop-down/designaton

  //http://10.81.4.195:2022/api/v1/fields/get-all-addType
  getAllAddType() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-addType`, auth());
  }
  //http://10.81.4.195:2022/api/v1/fields/get-all-clients
  getAllClients() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-clients`, auth());
  }
  //http://10.81.4.195:2022/api/v1/fields/get-all-Depart
  getAllDepart() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-Depart`, auth());
  }
  getAllSubDepart() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-subDepart`, auth());
  }
  getUnderEmployee(id) {
    if (id >= 0) {
      return axios.get(
        `${BASE_URL}/api/v1/emp/get-under-emps?id=${id}`,
        auth()
      );
    }
  }
  addClientDetails(data) {
    return axios.post(`${BASE_URL}/api/v1/client/details`, data, auth());
  }
  // http://10.81.4.195:2022/api/v1/client/details
  // addClientDetails2(cId, data) {
  //   return axios.put(`${BASE_URL}/api/v1/emp/update-client-details?clientDetailId=${cId}`, data, auth())
  // }
  // http://10.81.4.195:2022/api/v1/client/edit?clientDetailId=150
  // http://10.81.4.195:2022/api/v1/client/edit?clientDetailId=150
  addClientDetails2(cId, data) {
    return axios.put(
      `${BASE_URL}/api/v1/client/edit?clientDetailId=${cId}`,
      data,
      auth()
    );
  }
  jobstringsubmit2(id1, id2, id3, data, file) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post(
      `${BASE_URL}/api/v1/rec/post-jobstring?clientId=${id1}&e${id2}&hiringTypeId=${id3}&jobString=${data}`,

      formData,
      auth()
    );
  }
  // http://localhost:2022/api/v1/emp/update-client-details?clientDetailId=5

  supervisorId(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/primary-manager-desig?desigId=${id}`,
      auth()
    );
  }
  //edit employee
  supervisorIdmanager(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/primary-manager-desig?desigId=${id}`,
      auth()
    );
  }

  primarydesgs(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/all-employee-by-desig?desgId=${id}`,
      auth()
    );
  }
  primarydesgsination(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/all-employee-by-desig?desgId=${id}`,
      auth()
    );
  }

  // http://localhost:2022/api/v1/drop-down/all-employee-by-desig?desgId=5

  getEmployeeId() {
    //localhost:2022/api/v1/emp/client-emp-dropdown
    return axios.get(`${BASE_URL}/api/v1/emp/client-emp-dropdown`, auth());
  }
  addClientnames(data) {
    return axios.post(`${BASE_URL}/api/v1/fields/insert-clients`, data, auth());
  }
  getAllRoles() {
    return axios.get(`${BASE_URL}/api/v1/admin/all-roles`, auth());
  }
  // register
  signup(data, id) {
    // http://localhost:2022/api/v1/admin/sign-up?roleName=LEAD
    return axios.post(
      `${BASE_URL}/api/v1/admin/sign-up?roleName=${id}`,
      data,
      auth()
    );
  }
  insetDepart(data) {
    // http://localhost:2022/api/v1/fields/insert-depart
    return axios.post(`${BASE_URL}/api/v1/fields/insert-depart`, data, auth());
  }
  totalLead(data) {
    // http://10.81.4.195:2022/Total/lead
    return axios.post(`${BASE_URL}/Total/lead`, data, auth());
  }

  totalManagers() {
    return axios.get(`${BASE_URL}/Total/SuperAdminDefaultCalculator`, auth());
  }

  // @PostMapping("/SuperAdminDefaultCalculator")

  totalManager(data) {
    return axios.post(`${BASE_URL}/Total/managerCalculation`, data, auth());
  }
  totalGeneralManager(data) {
    return axios.post(
      `${BASE_URL}/Total/generalManagerCalculation`,
      data,
      auth()
    );
  }
  totalvicepresident(data) {
    return axios.post(`${BASE_URL}/Total/vicePresident`, data, auth());
  }
  totalCH(data) {
    return axios.post(`${BASE_URL}/Total/countryHeadCalculation`, data, auth());
  }
  totalMD(data) {
    return axios.post(
      `${BASE_URL}/Total/managingDirectorCalculation`,
      data,
      auth()
    );
  }
  addSubDepart(data, id) {
    // http://localhost:2022/api/v1/fields/insert-sub-depart/5
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-sub-depart/${id}`,
      data,
      auth()
    );
  }
  addDesg(data, id) {
    // http://localhost:2022/api/v1/fields/insert-desig?id=10
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-desig?id=${id}`,
      data,
      auth()
    );
  }
  addEmpType(data) {
    // http://localhost:2022/api/v1/fields/insert-employee-type
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-employee-type`,
      data,
      auth()
    );
  }
  addAddType(data) {
    // http://localhost:2022/api/v1/fields/insert-adsress-types
    return axios.post(
      `${BASE_URL}/api/v1/fields/insert-adsress-types`,
      data,
      auth()
    );
  }
  getAllClientsByEmpId(id) {
    // http://localhost:2022/api/v1/emp/get-emp-clientDetails?id=58
    return axios.get(`${BASE_URL}/api/v1/emp/details?empId=${id}`, auth());

    // return axios.get(`${BASE_URL}/api/v1/emp/details?empId=${id}`, auth());
  }

  updateSupervisorId(id, sId) {
    // http://localhost:2022/api/v1/emp/update-supervisor-id/LSI0633/65
    return axios.get(
      `${BASE_URL}/api/v1/hr/update-supervisor-id/${id}/${sId}`,
      auth()
    );
  }
  getEmpIdForSupervisor() {
    // http://localhost:2022/api/v1/hr/Hr-dropDown
    return axios.get(`${BASE_URL}/api/v1/hr/Hr-dropDown`, auth());
  }
  updateDesg(id, dId) {
    // http://localhost:2022/api/v1/hr/update-desg-hierarchy?desgId=89&newSupId=984
    return axios.get(
      `${BASE_URL}/api/v1/hr/update-desg-hierarchy?desgId=${id}&newSupId=${dId}`,
      auth()
    );
  }
  //add employee
  AddResume(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.post(`${BASE_URL}/Resumeupload?id=${id}`, formData, auth());
  }
  AddImage(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.post(
      `${BASE_URL}/api/v1/emp/photo-upload?lancesoftId=${id}`,

      formData,
      auth()
    );
  }

  UpdateImage(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.put(
      `${BASE_URL}/api/v1/emp/update-photo?lancesoftId=${id}`,

      formData,
      auth()
    );
  }
  UpdateResume(data, id) {
    let formData = new FormData();
    formData.append("file", data);
    return axios.put(`${BASE_URL}/ResumeUpdate?id=${id}`, formData, auth());
  }
  // http://10.81.4.195:2022/Resumedownload?lancesoft=lsi9824
  DownloadResume(lsi_id) {
    return axios.get(
      `${BASE_URL}/Resumedownload?lancesoft=${lsi_id}`,
      {
        responseType: "blob",
      },
      auth()
    );
  }

  // HR DASHBOARD//
  getDesignations() {
    return axios.get(`${BASE_URL}/getAllDesignation`, auth());
  }
  selectEmployee(des_id) {
    return axios.get(`${BASE_URL}/getByDesignationId/${des_id}`, auth());
  }
  getDesignationse() {
    return axios.post(`${BASE_URL}/getEmployeesForAllowances`, auth());
  }
  // selectEmployee(des_id) {
  //   return axios.get(`${BASE_URL}/getEmployeesForAllowances`, auth());
  // }

  // http://10.81.4.195:2020/getEmployeesForAllowances

  AssignTo(id) {
    return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  }

  ReportsTo(lanceId) {
    return axios.get(`${BASE_URL}/ReportsToPrimary/${lanceId}`, auth());
  }

  secondarymanagerpromote(lanceId, primaryId) {
    return axios.get(
      `${BASE_URL}/ReportsToSecondary/${lanceId}/${primaryId}`,
      auth()
    );
  }

  // http://localhost:2022/ReportsToSecondary/{lanceId}/{primaryId}

  promoteEmp(emp_id, sub_id, sub_id2, newSalary) {
    return axios.get(
      `${BASE_URL}/PromoteEmpDetails/${emp_id}/${sub_id}/${sub_id2}/${newSalary}`,
      auth()
    );
  }

  updatesalary(empId, salary, updateDate, data) {
    return axios.get(
      `${BASE_URL}/UpdateSalary/${empId}/${salary}/${updateDate}`,
      auth()
    );
  }

  // /UpdateSalary/{empId}/{salary}/{updateDate}

  // http://localhost:2022/PromoteEmpDetails/lsi013/LSI011/LSI003/987

  getDesignationses() {
    return axios.get(`${BASE_URL}/get-all-designations`, auth());
  }
  getDesignationsesEmployee() {
    return axios.get(`${BASE_URL}/get-all-designations`, auth());
  }

  ReleaseEmps(des_id) {
    // return axios.get(`${BASE_URL}/getall`, auth());
    return axios.get(`${BASE_URL}/getByDesignationId/${des_id}`, auth());
  }

  ReleaseEmpCmp(releaseDate, lancesoftId) {
    return axios.get(
      `${BASE_URL}/ReleaseEmp/${releaseDate}/${lancesoftId}`,
      auth()
    );
  }
  ReleaseEmpCmps(releaseDate, lancesoftId) {
    return axios.get(
      `${BASE_URL}/TerminateEmp/${releaseDate}/${lancesoftId}`,
      auth()
    );
  }
  // http://localhost:2025/TerminateEmp/lsi007
  //Abscond employee
  // AbscondEmo(id){
  //   return axios.get(`${BASE_URL}/getallemployees1/${id}`,auth())
  // }
  // AbscondEmoCmp(lancesoft){
  //   return axios.get(`${BASE_URL}/getemp1/${lancesoft}`,auth())
  // }

  //HR DASHBOARD// TRANSFER EMPLOYEE//
  getPromDesignations() {
    return axios.get(`${BASE_URL}/getAllDesignation`, auth());
  }
  selectEmployeeprom(id) {
    return axios.get(`${BASE_URL}/getByDesignation?des_id=${id}`, auth());
  }
  AssignToprom(id) {
    return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  }
  ReleaseEmpprom(id) {
    return axios.get(
      `${BASE_URL}/reportstodropdownsuperadmin?LancesoftId=${id}`,
      auth()
    );
  }
  secondarymanagertransfer(empId, mgrId) {
    return axios.get(
      `${BASE_URL}/secondaryreportstodropdownsuperadmin?LancesoftId=${empId}&primaryLancesoftId=${mgrId}`,
      auth()
    );
  }

  // http://localhost:2022/secondaryreportstodropdownsuperadmin?LancesoftId=LSI006&primaryManagerID=LSI5200
  AssigntransferEmp(id, id2) {
    return axios.get(`${BASE_URL}/setSupervisor/${id}/${id2}`, auth());
  }
  // promotetransferEmp(id, id2, Salary, Location) {
  //   return axios.get(
  //     `${BASE_URL}/transfer?LancesoftId=${id}&Location=${Location}&Salary=${Salary}&TansferLancesoftId=${id2}`,
  //     auth()
  //   );
  // }
  // http://localhost:2022/transfer?LancesoftId=LSI006&Location=ff&Salary=0.0&primaryLancesoftId=LSI5200&secondaryLancesoftId=null

  promotetransferEmp(id, id2, id3, Salary, Location) {
    return axios.get(
      `${BASE_URL}/transfer?LancesoftId=${id}&Location=${Salary}&Salary=${Location}&primaryLancesoftId=${id2}&secondaryLancesoftId=${id3}`,
      auth()
    );
  }
  // TRANSFER EMPLOYEE END //
  selectEmployeeReq() {
    return axios.get(`${BASE_URL}/getOnHoldEmployees`, auth());
  }
  selectEmployeeAssign(id) {
    return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  }
  GetAllEmployes(pageNumber) {
    return axios.get(
      `${BASE_URL}/api/v1/hr/card-detail?pageNumber=${pageNumber}`,
      auth()
    );
  }
  SearchEmployees(data) {
    return axios.get(`${BASE_URL}/api/v1/hr/search?keyword=${data}`, auth());
  }
  ApproveEmployee(lancesoft, emp_status) {
    return axios.get(`${BASE_URL}/send/${lancesoft}/${emp_status}`, auth());
  }
  // generalTransferEmplloyee(name) {
  //   return axios.get(
  //     `${BASE_URL}/getAllEmployeeUndercurrentlogin?name=${name}`,
  //     auth()
  //   );
  // }
  generalTransferEmplloyee(name) {
    return axios.get(
      // `${BASE_URL}/getAllEmployeeUndercurrentlogin?name=${name}`,
      // auth()
      `${BASE_URL}/consultants`,
      auth()
    );
  }
  // generalSelectEmploye(id) {
  //   return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  // }
  // generalAssignEmployee(id) {
  //   return axios.get(`${BASE_URL}/AssignToEmployee?LancesoftId=${id}`, auth());
  // }
  ReleaseEmployee(id) {
    return axios.get(
      // `${BASE_URL}/principalDesignationsDropdown?name=${name}`,
      // auth()
      `${BASE_URL}/reportstodropdown?LancesoftId=${id}`,
      auth()
    );
  }
  TransferEmplo(id, id2) {
    return axios.post(
      `${BASE_URL}/saveAndNext?LancesoftId=${id}&assign_id=${id2}`,

      auth()
    );
  }
  transferEmpgeneral(id, id2, Salary, Location) {
    return axios.get(
      `${BASE_URL}/transfer?LancesoftId=${id}&Location=${Location}&Salary=${Salary}&TansferLancesoftId=${id2}`,
      auth()
    );
  }
  GetAllEmployesby(pageNumber) {
    return axios.get(
      `${BASE_URL}/api/v1/emp/repotees?pageNumber=${pageNumber}`,
      auth()
    );
  }

  // Edit Client details
  getSelectEmp() {
    return axios.get(`${BASE_URL}/api/v1/emp/client-emp-dropdown`, auth());
  }
  getEmpdetail(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employee-clients?empId=${id}`,
      auth()
    );
  }
  getClientDetail(id) {
    //http://localhost:2022/api/v1/client/edit-request?clientDetailId=95
    return axios.get(
      `${BASE_URL}/api/v1/client/edit-request?clientDetailId=${id}`,
      auth()
    );
  }
  getClients() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-clients`, auth());
  }
  selectPractice() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-subDepart`, auth());
  }
  selectPractices() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-subDepart`, auth());
  }
  // Add client details
  getEmploy(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/consultants?lancesoftId=${id}&subDId=${value}`,
      auth()
    );
  }

  getEmploys(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/consultants?lancesoftId=${id}&subDId=${value}`,
      auth()
    );
  }
  selectempdesgination() {
    return axios.get(`${BASE_URL}/api/v1/drop-down/designaton`, auth());
  }
  selectempdesgns(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employee-by-desig?desgId=${id}&keyword=${value}`,
      auth()
    );
  }
  secondarymanager(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/report-to-desigs?desigId=${id}`,
      auth()
    );
  }
  selectmanager(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employee-by-desig?desgId=${id}&keyword=${value}`,
      auth()
    );
  }

  setsecondarymanager(id, id2, data) {
    return axios.post(
      `${BASE_URL}/api/v1/emp/subordinate-manager?empId=${id}&flag=false&supervisorId=${id2}`,
      data,
      auth()
    );
  }
  setsecondaryfor(id, id2, data) {
    return axios.post(
      `${BASE_URL}/api/v1/emp/subordinate-manager?empId=${id}&flag=true&supervisorId=${id2}`,
      data,
      auth()
    );
  }

  //AbscondEmployee
  getAllEmployees1(id) {
    return axios.get(`${BASE_URL}/getByDesignationId/${id}`, auth());
  }

  abscondEmp(releaseDate, lancesoft) {
    return axios.get(
      `${BASE_URL}/AbscondEmp/${releaseDate}/${lancesoft}`,
      auth()
    );
  }

  //Demote employee
  //alldesignations
  getAllDemoteDesignation() {
    return axios.get(`${BASE_URL}/getAllDemoteDesignations`, auth());
  }
  //select emp
  getAllDesignationEmployeess(id, data) {
    return axios.post(
      `${BASE_URL}/getAlldesignationEmployees/${id}`,
      data,
      auth()
    );
  }
  choosedesgination(id) {
    return axios.get(
      `${BASE_URL}/chooseDesignstionToAssign/${id}`,

      auth()
    );
  }

  // primary manager reports to
  newprimarymanager(des_id, empId) {
    return axios.get(
      `${BASE_URL}/getPrimarySupervisor/${des_id}/${empId}`,
      auth()
    );
  }
  // http://localhost:2021/getPrimarySupervisor/3

  addSupervisor(lanceId) {
    return axios.get(`${BASE_URL}/addSupervisor/${lanceId}`, auth());
  }
  getprimarysupervisor(des_id) {
    return axios.get(`${BASE_URL}/getPrimarySupervisor/${des_id}`, auth());
  }

  // secondary manager reports to
  addSecondarySupervisor(empId, superId) {
    return axios.get(
      `${BASE_URL}/addSecondSupervisor?empId=${empId}&superId=${superId}`,
      auth()
    );
  }

  newSecondarySupervisor(des_id, empId, superId) {
    return axios.get(
      `${BASE_URL}/getSecondarySupervisor?des_id=${des_id}&empId=${empId}&superId=${superId}`,
      auth()
    );
  }

  // http://localhost:2021/getSecondarySupervisor?des_id=4&empId=lsi4455&superId=null
  //submit
  demoteEmp(id, id1, id2, Salary) {
    return axios.get(
      `${BASE_URL}/demote/${id}/${id1}/${id2}/${Salary}`,
      auth()
    );
  }

  promotedemoteEmp(Salary, emp_id, id1, id2, updated_date, newDesg) {
    return axios.get(
      `${BASE_URL}/submit/${emp_id}/${id1}/${id2}/${Salary}/${updated_date}/${newDesg}`,
      auth()
    );
  }

  //Delete Employee
  DesinationsForDeleteModule() {
    return axios.get(`${BASE_URL}/getAllDemoteDesignations`, auth());
  }

  ShowEmployeesToDelete(desg_id) {
    return axios.get(
      `${BASE_URL}/api/v1/admin/ShowEmployeesToDelete/${desg_id}`,
      auth()
    );
  }
  // http://10.81.4.195:2022/api/v1/admin/ShowEmployeesToDelete/3
  deleteEmployees(lancesoftid) {
    return axios.delete(
      `${BASE_URL}/api/v1/admin/delete-employee/${lancesoftid}`,
      auth()
    );
  }

  ShowEmployeesToDelete(empid) {
    return axios.get(
      `${BASE_URL}/api/v1/admin/ShowEmployeesToDelete/${empid}`,
      auth()
    );
  }

  deleteEmployee(empId) {
    return axios.delete(
      `${BASE_URL}/api/v1/admin/DeleteEmployee?empId=${empId}&flag=${false}`,
      auth()
    );
  }
  // api/v1/admin/DeleteEmployee?empId=2&flag=false
  deleteEmployeefor(empId) {
    return axios.delete(
      `${BASE_URL}/api/v1/admin/DeleteEmployee?empId=${empId}&flag=${true}`,
      auth()
    );
  }
  // ChangePassword
  // http://localhost:2022/api/v1/auth/change-password
  ChangePassword(data) {
    return axios.put(`${BASE_URL}/api/v1/auth/change-password`, data, auth());
  }

  recuiterdropdown() {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employees-by-responsibilites?keyword=lsi&types=RECRUITER`,
      auth()
    );
  }

  Towerheaddropdown() {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employees-by-responsibilites?keyword=lsi&types=TOWER_HEAD`,
      auth()
    );
  }
  Towerleaddropdown() {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employees-by-responsibilites?keyword=lsi&types=TOWER_LEAD`,
      auth()
    );
  }
  AddAllowance(id2, id3, id4, id5, id6, id7, EmployeeId, data) {
    return axios.get(
      `${BASE_URL}/SubmitTheAllowances/${id2}/${id3}/${id4}/${id5}/${id6}/${id7}/${EmployeeId}`,
      data,
      auth()
    );
  }
  // http://10.81.4.195:2020/SubmitTheAllowances/0/0/0/0/0/0/LSI3000

  specialallowance(id) {
    return axios.get(`${BASE_URL}/getAllowances?employeeId=${id}`, auth());

    // return axios.get(`${BASE_URL}/api/v1/emp/details?empId=${id}`, auth());
  }
  // AssignResponsibilities
  // http://localhost:2022/api/v1/drop-down/designaton
  Designations() {
    return axios.get(`${BASE_URL}/api/v1/drop-down/designaton`, auth());
  }
  // http://localhost:2022/api/v1/drop-down/employee-by-desig?desgId=2&keyword=umer
  EmployeeDesId(id, value) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employee-by-desig?desgId=${id}&keyword=${value}`,
      auth()
    );
  }
  // http://localhost:2022/api/v1/drop-down/responsibilites?empId=120
  Responsibility(id) {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/responsibilites?empId=${id}`,
      auth()
    );
  }

  // http://localhost:2022/api/v1/emp/set-responsibilities?empId=120&responsibility=TOWER_LEAD&responsibility=RECRUITER
  SetResponsibilities(id, resp1, resp2, resp3) {
    let r1 = "";
    let r2 = "";
    let r3 = "";
    if (resp1 !== null && resp1 !== undefined) r1 = `&responsibility=${resp1}`;
    if (resp2 !== null && resp2 !== undefined) r2 = `&responsibility=${resp2}`;
    if (resp3 !== null && resp3 !== undefined) r3 = `&responsibility=${resp3}`;

    return axios.post(
      `${BASE_URL}/api/v1/emp/set-responsibilities?empId=${id}${r1}${r2}${r3}`,
      auth()
    );
  }
  // http://localhost:2022/api/v1/drop-down/employees-by-responsibilites?keyword=lsi&types=TOWER_HEAD
  EmployeeByResponsibilites() {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employees-by-responsibilites?keyword=lsi&types=TOWER_HEAD`,
      auth()
    );
  }

  EmployeeByResponsibilites1() {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employees-by-responsibilites?keyword=lsi&types=TOWER_LEAD`,
      auth()
    );
  }

  EmployeeByResponsibilites2() {
    return axios.get(
      `${BASE_URL}/api/v1/drop-down/employees-by-responsibilites?keyword=lsi&types=RECRUITER`,
      auth()
    );
  }

  // http://localhost:2020/api/v1/fields/get-all-clients
  GetAllSubClients() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-clients`, auth());
  }

  enhancedFields(empId) {
    return axios.get(
      `${BASE_URL}/api/v1/client/get_enhancedFields/${empId}`,
      auth()
    );
  }
  subcontractor() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-clients`, auth());
  }
  getTechnology() {
    return axios.get(`${BASE_URL}/api/v1/fields/technologies`, auth());
  }
  getTechnologys() {
    return axios.get(`${BASE_URL}/api/v1/fields/technologies`, auth());
  }
  clientnames() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-clients`, auth());
  }
  jobstringsubmit(id1, id2, id3, data) {
    return axios.post(
      `${BASE_URL}/api/v1/rec/post-jobstring?clientId=${id1}&empIds=${id2}&jobString=${id3}`,
     
      
      auth()
    );
  }

  // http://10.81.4.195:2020/api/v1/rec/posted-jobs?falg=true
  getPostedJobs(falg) {
    return axios.get(`${BASE_URL}/api/v1/rec/posted-jobs?falg=${falg}`, auth());
  }
  // http://localhost:2020/api/v1/rec/posted-job-profiles?jobStringId=1
  getPostedJobProfiles(id) {


    return axios.get(
      `${BASE_URL}/api/v1/rec/posted-job-profiles?jobStringId=1`,
      auth()
    );
  }
  jobstringsubmit(id1, id2, data) {
    return axios.post(
      // `${BASE_URL}/api/v1/rec/post-jobstring?clientId=${id1}&empIds=${id2}&jobString=${data}`,

      `${BASE_URL}/api/v1/rec/post-jobstring?clientId=${id1}&empIds=${id2}&jobString=%7B%20%22jd%22%3A%22sindhu%20bindhu%22%2C%20%22budget%22%3A%225%22%2C%20%22totalPosition%22%3A%226%22%2C%20%22openDate%22%3A%222021-01-01%22%2C%20%22closeDate%22%3A%222022-01-01%22%20%7D`,
      auth()
    );
  }
  // jobstringsubmit(id1, id2, id3, data) {
  //   return axios.post(
  //     `${BASE_URL}/api/v1/rec/post-jobstring?clientId=${id1}&empIds=${id2}&jobString=${id3}`,
  //     data,
  //     auth()
  //   );
  // }

  // jobstringsubmit(id1, id2, id3, data) {
  //   let formData = new formData();
  //   formData.append("file", data);
  //   return axios.post(
  //     `${BASE_URL}/api/v1/rec/post-jobstring?clientId=${id1}&empIds=${id2}&file=${data}&jobString=${id3}`,
  //     formData,
  //     data,
  //     auth()
  //   );
  // }

  // http://10.81.4.195:2020/api/v1/rec/posted-jobs?falg=true
  // getPostedJobs(falg) {
  //   return axios.get(`${BASE_URL}/api/v1/rec/posted-jobs?falg=${falg}`, auth());
  // }
  // http://localhost:2020/api/v1/rec/posted-job-profiles?jobStringId=1
  getPostedJobProfiles(id) {
    return axios.get(
      `${BASE_URL}/api/v1/rec/posted-job-profiles?jobStringId=${id}`,
      auth()
    );
  }

  jobstringsubmit(id1, id2, data, file) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post(
      `${BASE_URL}/api/v1/rec/post-jobstring?clientId=${id1}&e${id2}&jobString=${data}`,

      formData,
      auth()
    );
  }

  AssignName() {
    return axios.get(`${BASE_URL}/api/v1/drop-down/rec`, auth());
  }
  HiringType() {
    return axios.get(`${BASE_URL}/api/v1/fields/get-all-empTypes`, auth());
  }
  PostedJobsFilter(data)
  {
    console.log(data.date)
    return axios.get(`${BASE_URL}/api/v1/rec/posted-jobs-filters`, {
      params: {
        falg:true,
        date:data.date,
        hiringType:data.hiringType,
        clientId:data.clientId
      },
      ...auth(), // Spread the authentication headers
    });
   
  }
  
  TechnologyName(data) {
    return axios.post(`${BASE_URL}/api/v1/fields/technology`, data, auth());
  }
  // http://localhost:2020/api/v1/rec/approve-profiles
  ApproveProfiles(data) {
    return axios.put(`${BASE_URL}/api/v1/rec/approve-profiles`, data, auth());
  }
  // http://10.81.4.195:2020/api/v1/rec/tagged-jobs?falg=true?
  getTaggedJobs(flag) {
    return axios.get(`${BASE_URL}/api/v1/rec/tagged-jobs?falg=${flag}`, auth());
  }
  // http://localhost:2020/api/v1/rec/send-profile?jobStringId=15&profiles=
  sendProfiles(id, data, resume) {
    let formData = new FormData();
    formData.append("file", resume);
    return axios.post(
      `${BASE_URL}/api/v1/rec/send-profile?jobStringId=${id}&profiles=${data}`,
      formData,
      auth()
    );

    //return axios.post("http://10.81.4.195:2020/api/v1/rec/send-profile?jobStringId=1&profiles=%7B%20%22candidateName%22%3A%20%22Rajesh%20V%22%2C%20%22emailId%22%3A%20%22Rajesh%40gmail.com%22%2C%20%22mobileNo%22%3A%206546556%2C%20%22currentCTC%22%3A%2015%2C%20%22expectedCTC%22%3A%2018%2C%20%22relevantExp%22%3A%20%225%20yrs%22%2C%20%22totalExp%22%3A%20%228%20yrs%22%2C%20%22currentOrg%22%3A%20%22Capg%22%20%7D", formData, auth())
  }
  // http://localhost:2020/api/v1/rec/sent-profiles?jobStringId=15
  GetViewSendProfiles(id) {
    return axios.get(
      `${BASE_URL}/api/v1/rec/sent-profiles?jobStringId=${id}`,
      auth()
    );
  }
  //  http://10.81.4.195:2020/api/v1/rec/schedule-status?candidateId=EMP_020
  scheduleStatus(id) {
    console.log(id);
    return axios.get(
      `${BASE_URL}/api/v1/rec/schedule-status?candidateId=${id}`,
      auth()
    );
  }
  // http://10.81.4.195:2020/api/v1/rec/interview-status
  interviewStatus(data) {
    return axios.put(`${BASE_URL}/api/v1/rec/interview-status`, data, auth());
  }
  //http://10.81.4.195:2020/api/v1/rec/profile-tracking?jobId=93
  profiletracking(id){
    return axios.get(
      `${BASE_URL}/api/v1/rec/profile-tracking?jobId=${id}`,
      auth()
    );
  }
})();

