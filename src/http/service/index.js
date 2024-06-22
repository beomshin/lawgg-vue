import authService from './auth'
import boardService from './board'
import boardCommentService from './board/comment'
import lawFirmService from './lawFirm'
import trialService from './trial'
import trialCommentService from './trial/comment'
import messageService from './message'
import signService from './sign'
import userService from './user'
import LoginService from './login'
import HomeService from './home'
import FileService from './file'

export default {
    ...authService,
    ...boardService,
    ...boardCommentService,
    ...lawFirmService,
    ...messageService,
    ...trialService,
    ...trialCommentService,
    ...LoginService,
    ...signService,
    ...userService,
    ...HomeService,
    ...FileService
}
