<?php


namespace App\Http\Controllers\Web\Auth;


use App\Http\Controllers\Controller;
use App\Http\Controllers\Utils;
use App\Models\Setting;
use App\Traits\ValidationTrait;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class CustomPasswordResetController extends Controller
{
    use ValidationTrait;

    public function showResetForm(Request $request, $token = null)
    {
        $settings = Setting::first();
        return view('auth.password_reset')->with(
            [
                'token' => $token,
                'email' => $request->email,
                'city' => $settings->city,
                'web_address' => $settings->web_address
            ]
        );
    }

    public function reset(Request $request)
    {
        $request->validate($this->rules(), $this->MESSAGES, $this->ATTRIBUTES);

        $credentials = $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );

//        $broker = app('auth.password.broker');

        $user = $this->broker()->getUser($credentials);
        if ($user === null) {
            return response([ResponseKeys::MESSAGE =>  "Kullanıcı e-posta adresi bulunamadı!"], 404);
        }

        $isExist =  $this->broker()->tokenExists($user, $credentials["token"]);

        if ($isExist) {
            $result =  $this->broker()->reset($credentials, function ($user, $pass){
                $this->resetPassword($user, $pass);
            });
            if ($result === PasswordBroker::PASSWORD_RESET) {
                return view("app");
            }
            return redirect()
                ->back()
                ->withInput($request->only('email'))
                ->withErrors([ResponseKeys::MESSAGE => "Şifre değiştirme işlemi yapılamadı."]);
        }
        return redirect()
            ->back()
            ->withInput($request->only('email'))
            ->withErrors([ResponseKeys::MESSAGE =>  "Şifre değiştirme bağlantısının süresi geçmiş olabilir.\nŞifremi unuttum diyerek tekrar bağlantı alabilirsiniz!"]);
    }

    protected function resetPassword($user, $password) {
        $user->password = Hash::make($password);
        $user->activation_date = Carbon::now();
        $user->setRememberToken(Str::random(60));
        $user->save();
    }

    protected function rules()
    {
        return [
            'token' => 'required',
            'email' => 'required|email',
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'max:16',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&\.]).{8,16}$/'
            ]
        ];
    }

    public function broker()
    {
        return Password::broker();
    }

    /**
     * Get the guard to be used during password reset.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }
}
