import express from 'express';
import { prisma } from '@root/lib/prisma';
import { createClassController } from '@/controllers';
import { createClassService, getRoleService } from '@/services';

const router = express.Router();

const roleService = getRoleService(prisma);
const classService = createClassService(prisma, roleService);
const classController = createClassController(classService);

router.post('/', classController.createClass);
router.get('/educator', classController.getEducatorClassList);
router.get('/student', classController.getStudentClassList);
router.get('/:classId', classController.getClassById);
router.put('/:classId', classController.updateClass);
router.delete('/:classId', classController.deleteClass);

export { router as classRouter };
