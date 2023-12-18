<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public function index() {
        $customers = Customer::all();
        $customers = CustomerResource::collection($customers);
        return $this->sendSuccess($customers);
    }

    public function store(Request $request, Customer $customer)
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string',
            'email' => 'required|email|unique:customers,email',
            'phoneNumber' => 'required|string',
            'address' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return $this->sendError($errorMessage);
        }
        
        $data = $customer->store($request->all());
        return $this->sendSuccess($data);
    }

    public function update(Request $request, Customer $customer)
    {
        if(!$customer) {
            abort('Customer not found');
        }
        // return $customer;
        $customer->full_name = $request->get('fullName', $customer->full_name);
        $customer->phone = $request->get('phoneNumber', $customer->phone);
        $customer->address = $request->get('address', $customer->address);
        $customer->save();
        return $this->sendSuccess($customer->fresh());
    }

    public function destroy(Request $request, Customer $customer)
    {
        if(!$customer) {
            abort('Customer not found');
        }
        $data = $customer->delete();
        $this->sendSuccess($data);
    }
}
