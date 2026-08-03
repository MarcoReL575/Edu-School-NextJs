import { APIError, email, User } from "better-auth";
import { Role, SignInProps, SignUpProps } from "../types/auth-types";
import { IAuthRepository, authRepository } from "./AuthRepository";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";


class AuthService {
    constructor(
        private authRepository: IAuthRepository
    ){}

    async studetExists(input: SignUpProps) {
        return await this.authRepository.selectStudent(input);
    }

    async teacherExists(input: SignUpProps) {
        return await this.authRepository.selectTeacher(input);
    } 

    async createAccount(input: SignUpProps) {
        try {
            const userExists = await this.authRepository.userExists(input.email);
            if(userExists) return { success: false, message: 'El correo ya fue registrado' }

            const { roleId, role } = input
            console.log({roleId, input})

            //Si el rol es estudiante, verificamos que el estudiante ya existe en la base de datos
            if(role === 'estudiante') {
                const { enrolledStudent, studentInfo } = await this.studetExists(input);
                if(!enrolledStudent || !studentInfo) return { success: false, message: '*Error en los datos ingresados' } 
                
                if(studentInfo.matricula === roleId && studentInfo.name === input.name && studentInfo.lastName === input.lastname ){
                    const { user } = await this.signUp(input)
                    await authRepository.roleAssign(role, input.email);
                    await authRepository.insertStudentId(user.id, roleId);
                    return { success: true, message: 'Cuenta creada' }
                }
            }
 
            if(role === 'maestro') {
                const { enrolledTeacher, teacherInfo } = await this.teacherExists(input);
                console.log({enrolledTeacher, teacherInfo});
                if(!enrolledTeacher || !teacherInfo) return { success: false, message: '*Error en los datos ingresados' } 
                
                if(teacherInfo.code_teacher === roleId && teacherInfo.name === input.name && teacherInfo.lastName === input.lastname ){
                    const { user, success, message } = await this.signUp(input);
                    console.log(user, success, message);
                    await authRepository.roleAssign(role, input.email);
                    await authRepository.insertTeacherId(user.id, roleId);
                    return { success: true, message: 'Cuenta creada' }
                }
            };

            if(role === 'admin' && roleId === 'admin12345') {
                console.log({role, roleId})
                await this.signUp(input);
                await authRepository.roleAssign(role, input.email);
                return { success: true, message: 'Cuenta creada' }
            };

            return { success: false, message: '*Error en los datos ingresados' }
        } catch (error) {
            if(error instanceof APIError){
                console.log(error)
            }
            return { success: false, message: '*Error en los datos ingresados' }
        }
    }

    async login(input: SignInProps) {
        try {
            const userExists = await this.authRepository.userExists(input.email);
            if(!userExists) return { success: false, message: 'El usuario no existe'}

            await this.authRepository.signin(input);
            return { success: true, message: '¡Bienvenido!' }
        } catch (error) {
            console.log(error)
            return { success: false, message: 'Error al iniciar sesión' }
        }
    }

    async signUp(input: SignUpProps) {
        try {
            const user = await auth.api.signUpEmail({
                body: {
                    name: input.name,
                    email: input.email,
                    password: input.password,
                }
            })
            return { success: true, message: '¡Bienvenido!', user: user.user }
        } catch (error) {
            console.log(error)
            return { success: false, message: 'Error al iniciar sesión', user: {} as User}
        }
    }

    async signOut() {
        await auth.api.signOut({
            headers: await headers() ,
        })       
    }

}

export const authService = new AuthService(authRepository);