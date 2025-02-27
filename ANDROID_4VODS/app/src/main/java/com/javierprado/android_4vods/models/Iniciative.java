import java.util.List;

public class Iniciative {
    private int id;
    private String name;
    private String description;
    private String startDate;
    private String endDate;
    private int hours;
    private String schoolYear;
    private List<Teacher> teachers;
    private List<Company> companies;
    private List<Module> modules;
    private List<Goal> goals;

    // Getters y setters
}

class Teacher {
    private int id;
    private String name;

    // Getters y setters
}

class Company {
    private int id;
    private String name;

    // Getters y setters
}

class Module {
    private int id;
    private String name;
    private Degree degree;

    // Getters y setters
}

class Degree {
    private int id;
    private String name;

    // Getters y setters
}

class Goal {
    private int id;
    private String description;
    private int idOds;

    // Getters y setters
}
