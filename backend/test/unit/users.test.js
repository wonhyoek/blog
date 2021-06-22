const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const UserController = require('../../controller/user');
const Pool = require('../../mysql/pool');
const newUser = require('../newUser.json');


let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe('UserController.create', () => {

    beforeEach(() => {
        req.body = newUser
        Pool.query = jest.fn();
        bcrypt.hash = jest.fn();
    })

    it('Should be a function', () => {
        expect(typeof UserController.create).toBe('function');
    });
    it('req should have valid data', () => {
        UserController.create(req, res, next);
        expect(req.body.username).toBe(newUser.username); 
        expect(req.body.email).toBe(newUser.email);
        expect(req.body.password).toBe(newUser.password);
    });
    it('should call Pool.query with username, email validation', async () => {
        await UserController.create(req, res, next);
        expect(Pool.query).toBeCalledWith('call checkEmail(?)', [req.body.email]);
        expect(Pool.query).toBeCalledWith('call checkUsername(?)', [req.body.username]);
    });
    it('should return false response code when unvalid email and username', async () => {
        const mockValue = [[{id: 23}], [{id: 54}]]
        Pool.query.mockReturnValue(mockValue);
        await UserController.create(req, res, next);
        expect(res._getJSONData()).toStrictEqual({success: false, "message": "이메일과 닉네임이 이미 사용중입니다."});
    });
    it('should call bcrypt.hash and create User', async () => {
        const mockValue = undefined;
        res.json = jest.fn();
        Pool.query.mockReturnValue(mockValue);
        await UserController.create(req, res, next);
        expect(bcrypt.hash)
        expect(Pool.query).toBeCalled();
        expect(res.json).toBeCalled();
    });

})