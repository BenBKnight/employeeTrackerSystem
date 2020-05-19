INSERT INTO departments (name) VALUES ('Mangaement');
INSERT INTO departments (name) VALUES ('Sales Staff');
INSERT INTO departments (name) VALUES ('Accounting');
INSERT INTO departments (name) VALUES ('Customer Service');


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Michael','Scott',1,NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jim','Halpert',5,1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Pam', 'Beasley',2,2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Dwight','Schrute',8,2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Stanley','Hudson',2,2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Phylis','Vance',2,2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Andy','Bernard',9,2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Kelly','Kapor',4,9);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Ryan','Howard',7,1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Kevin','Malone',3,12);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Oscar','Martinez',3,12);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Angela','Martin',6,1);

INSERT INTO roles (title, salary, department_id) VALUES ('Regional Manager',80000,1);
INSERT INTO roles (title, salary, department_id) VALUES ('Salesman',40000,2);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant',60000,3);
INSERT INTO roles (title, salary, department_id) VALUES ('Customer Service Representative',35000,4);
INSERT INTO roles (title, salary, department_id) VALUES ('Co-Manager',70000,1);
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Accounting',70000,3);
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Customer Service',40000,4);
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Sales',50000,2);
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Accounting',70000,3);
INSERT INTO roles (title, salary, department_id) VALUES ('Director of Sales',40000,2);
