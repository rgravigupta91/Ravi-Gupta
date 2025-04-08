#!C:/Python/Python312/python
# -*- coding: utf-8 -*-
"""
Created on Tue Apr  6 14:08:44 2021
@author: Senthil

Updated on Tue Jan  21 13:17:44 2021
@author: kaustuv Kunal

"""



import flask
import pickle
import pandas as pd
import requests
import cgi 

def predict():
	form = cgi.FieldStorage()
	Married = form.getvalue('Married')
	Education = form.getvalue('Education')
	ApplicantIncome = form.getvalue('ApplicantIncome')
	LoanAmount = form.getvalue('LoanAmount')
	Credit_History = form.getvalue('Credit_History')
	
	try:
		my_model=pickle.load(open('full_pipeline','rb'))
	except Exception as e:
		print('Model Load Error : ',repr(e))
	try:
		test = pd.DataFrame([[Married,Education,ApplicantIncome,LoanAmount,Credit_History]],
							   columns=['Married','Education','ApplicantIncome','LoanAmount','Credit_History'],
							   #dtype=float,
							   index=['input'])	
	except Exception as e:
		print('DataFrame reation : ',repr(e))
	return my_model.predict(test)[0]
	
print("Content-Type: text/html")
print("");
print("<h1>This is my first Python Program</h1>")
print("Probability for rejection is : ",predict())


#
# Extract the input



        # Make DataFrame for model


# Get the model's prediction




"""     
        #prediction = model.predict(input_variables)[0]
    
        # Render the form again, but add in the prediction and remind user
        # of the values they input before
		
        return flask.render_template('main.html',
                                     original_input={'Married':Married,
                                                     'Education':Education,
                                                     'ApplicantIncome':ApplicantIncome,
                                                     'LoanAmount':LoanAmount,
                                                     'Credit_History':Credit_History},
                                     result=prediction,
                                     )
"""