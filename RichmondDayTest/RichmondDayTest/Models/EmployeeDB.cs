using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace RichmondDayTest.Models
{
    public class EmployeeDB
    {
        //declare connection string  
        string cs = ConfigurationManager.ConnectionStrings["MyDbConn1"].ConnectionString;

        //Return list of all Employees  
        public List<Employee> ListAll()
        {
            List<Employee> lst = new List<Employee>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Employee
                    {
                        id = Convert.ToInt32(rdr["id"]),
                        first_name = rdr["first_name"].ToString(),
                        last_name = rdr["last_name"].ToString(),
                        email = rdr["email"].ToString(),
                    });
                }
                return lst;
            }
        }

        //Method for Adding an Employee  
        public int Add(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id", emp.id);
                com.Parameters.AddWithValue("@first_name", emp.first_name);
                com.Parameters.AddWithValue("@last_name", emp.last_name);
                com.Parameters.AddWithValue("@email", emp.email);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Updating Employee record  
        public int Update(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id", emp.id);
                com.Parameters.AddWithValue("@first_name", emp.first_name);
                com.Parameters.AddWithValue("@last_name", emp.last_name);
                com.Parameters.AddWithValue("@email", emp.email);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Employee  
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}