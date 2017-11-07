import * as actionTypes from './actionTypes';
import { LoginService } from '../../services';
import asyncActionHandler from '../asyncActionHandler';

export const login = asyncActionHandler(actionTypes.LOGIN, LoginService.login);
