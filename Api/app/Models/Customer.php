<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'address',
    ];

    public function store($data)
    {
        return $this->create([
            'full_name' => $data['fullName'],
            'email' => $data['email'],
            'phone' => $data['phoneNumber'],
            'address' => $data['address'],
        ]);
    }
}
