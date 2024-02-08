import { postData } from "../utils/request";

interface LoginForm {
	email: string;
	password: string;
	isLoading: boolean;
}
interface SignUpForm {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	isTermsAccepted: boolean;
}
interface OtpForm {
	otp: string[];
}

const loginDefaultState: LoginForm = {
	email: "",
	password: "",
	isLoading: false,
};
const signUpDefaultState: SignUpForm = {
	name: "",
	email: "",
	password: "",
	passwordConfirm: "",
	isTermsAccepted: false,
};
const otpDefaultState: OtpForm = {
	otp: ["", "", "", "", "", ""],
	isLoading: false,
};

export const useLoginStore = defineStore("authLogin", {
	state: (): LoginForm => loginDefaultState,
	getters: {
		isValid: (state: LoginForm) => state.email && state.password,
	},
	actions: {
		setEmail(value: string) {
			this.email = value;
		},
		setPassword(value: string) {
			this.password = value;
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		async submitForm() {
			try {
				this.setIsLoading(true);
				const data = await postData("/auth/login", {
					username: this.email,
					password: this.password,
				});
				console.log(data);
			} catch(err) {
				throw new Error(`Login error - ${err}`);
			} finally {
				this.setIsLoading(false);
			}
		},
	},
});

export const useSignUpStore = defineStore("authSignUp", {
	state: (): SignUpForm => signUpDefaultState,
	getters: {
		isValid: (state: SignUpForm) =>
			Boolean(
				state.name &&
				state.email &&
				state.password &&
				state.passwordConfirm &&
				(
					state.password === state.passwordConfirm
				) &&
				state.isTermsAccepted
			),
	},
	actions: {
		setName(value: string) {
			this.name = value;
		},
		setEmail(value: string) {
			this.email = value;
		},
		setPassword(value: string) {
			this.password = value;
		},
		setPasswordConfirm(value: string) {
			this.passwordConfirm = value;
		},
		setIsTermsAccepted(value: boolean) {
			this.isTermsAccepted = value;
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
	},
});

export const useOtpStore = defineStore("otp", {
	state: (): OtpForm => otpDefaultState,
	getters: {
		isValid: (state: OtpForm) => {
			const signUpStore = useSignUpStore();
			return state.otp.every((str: string) => str) &&
				signUpStore.isValid;
		}
	},
	actions: {
		setOtp(index: number, value: string) {
			this.otp = this.otp.map((val, i) => index === i ? value : val);
		},
		clearOtp() {
			this.otp = this.otp.map(() => "");
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		async submitForm() {
			const signUpStore = useSignUpStore();
			try {
				this.setIsLoading(true);
				// На dummy json нет API-метода для sign up. Только login :(
				await postData("/auth/login", {
					username: signUpStore.name,
					password: signUpStore.password,
				});
			} catch(err) {
				throw new Error(`Sign up error - ${err}`);
			} finally {
				this.setIsLoading(false);
			}
		},
	},
});