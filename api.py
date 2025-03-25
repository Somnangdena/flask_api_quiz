from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
db = SQLAlchemy(app)
api = Api(app)


class QuizModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subjectname = db.Column(db.String(80),unique= False, nullable=False)
    question = db.Column(db.String(100),unique= False, nullable=False)
    answer = db.Column(db.String(80),unique= False, nullable=False)


    def __repr__(self):
        return f"Quiz(subjectname = {self.subjectname}, question={self.question}, anwser={self.answer})"


quiz_args = reqparse.RequestParser()
quiz_args.add_argument('subjectname', type=str, required=True, help="Subject name cannot be blank")
quiz_args.add_argument('question', type=str, required=True, help="Name cannot be blank")
quiz_args.add_argument('answer', type=str, required=True, help="answer cannot be blank")

quizFields = {
    'id':fields.Integer,
    'subjectname':fields.String,
    'question':fields.String,
    'answer':fields.String
}

class Quizs(Resource):
    @marshal_with(quizFields)
    def get(self):
        quizs = QuizModel.query.all()
        return quizs 
    
    @marshal_with(quizFields)
    def post(self):
        args = quiz_args.parse_args()
        quiz = QuizModel(subjectname=args["subjectname"], question=args["question"], answer=args["answer"])
        db.session.add(quiz)
        db.session.commit()
        quizs = QuizModel.query.all()
        return quizs, 201
    

class Quiz(Resource):
    @marshal_with(quizFields)
    def get(self, id):
        quiz= QuizModel.query.filter_by(id=id).first()
        if not quiz:
            abort(404, "quiz not found")
        return quiz
    
    @marshal_with(quizFields)
    def patch(self, id):
        args = quiz_args.parse_args()
        quiz= QuizModel.query.filter_by(id=id).first()
        if not quiz:
            abort(404, "quiz not found")
        quiz.subjectname = args["subjectname"]
        quiz.question = args["question"]
        quiz.answer = args["answer"]
        db.session.commit()
        return quiz
    
    @marshal_with(quizFields)
    def delete(self, id):
        quiz= QuizModel.query.filter_by(id=id).first()
        if not quiz:
            abort(404, "quiz not found")
        db.session.delete(quiz)
        db.session.commit()
        quizs = QuizModel.query.all()
        return quizs

class Quizname(Resource):
    @marshal_with(quizFields)
    def get(self, subjectname):
        quiz= QuizModel.query.filter_by(subjectname=subjectname).all()
        if not quiz:
            abort(404, "quiz not found")
        return quiz

api.add_resource(Quizs, '/api/quizs')
api.add_resource(Quiz, '/api/quizs/<int:id>')
api.add_resource(Quizname, '/api/quizs/<string:subjectname>')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/space')
def space():
    return render_template('space.html')

@app.route('/animal')
def animal():
    return render_template('animal.html')

@app.route('/programming')
def programming():
    return render_template('programming.html')

if __name__ == '__main__':
    app.run(debug=True)