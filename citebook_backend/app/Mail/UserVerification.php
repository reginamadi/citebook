<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class UserVerification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        //
        $this->user=$user;
        
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {//>view( view: 'mail.name' , [ ' email_data' => $this->user]
        return $this->from(env(key:'MAIL_USERNAME'),name:'citebook')->view('mail.name',['user' => $this->user]);
      
    }
}
