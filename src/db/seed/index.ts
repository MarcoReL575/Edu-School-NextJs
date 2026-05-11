import { db } from "@/src/db";
import { subjectsArray } from "./data/materias";
import { students, teachers, subjects, group } from "../schema";
import { studentsArray } from "./data/students";
import { groupsArray } from "./data/group";
import { teachersArray } from "./data/teachers";

async function main() {    
    try {
        //  await db.insert(subjects).values(subjectsArray);
        // await db.insert(students).values(studentsArray);
        // await db.insert(group).values(groupsArray);
        await db.insert(teachers).values(teachersArray);
        console.log('✅ Datos ingresados correctamente');
    } catch (error) {
        console.error('❌ Error al ingresar datos:', error);
    }
} 

main();
