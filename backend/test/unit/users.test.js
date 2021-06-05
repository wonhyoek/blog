const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const UserController = require('../../controller/user');
const Pool = require('../../mysql/pool');
const newUser = require('../newUser.json');

Pool.query = jest.fn();
Pool.end = jest.fn();
bcrypt.hash = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe('UserController.create', () => {

    beforeEach(() => {
        req.body = newUser
    })

    it('Should be a function', () => {
        expect(typeof UserController.create).toBe('function');
    });
    it('req should have valid data', () => {
        UserController.create(req, res, next);
        expect(req.body.userName).toBe(newUser.userName);
        expect(req.body.email).toBe(newUser.email);
        expect(req.body.password).toBe(newUser.password);
    });
    it('should call Pool.query with username, email validation', async () => {
        await UserController.create(req, res, next);
        expect(Pool.query).toBeCalledWith('select * from User where email = ?', [req.body.email]);
        expect(Pool.query).toBeCalledWith('select * from User where username = ?', [req.body.username]);
    });
    it('should return 400 response code when unvalid email and username', async () => {
        Pool.query.mockReturnValue([[{id: 25}]]);
        await UserController.create(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({success: false});
        expect(Pool.end).toBeCalled();
    });
    it('should call bcrypt.hash', async () => {
        await UserController.create(req, res, next);
        expect(bcrypt.hash).toBeCalledWith(req.body.password, 10);
    });
    it('should create User with Pool.query', async () => {
        await UserController.create(req, res, next);
        expect(Pool.query)
        .toBeCalledWith('insert into User(username, email, password) values(?, ?, ?);');
    })
})