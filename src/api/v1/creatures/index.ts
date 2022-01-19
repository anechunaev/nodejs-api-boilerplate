import { Router } from 'express';
import asyncHandler from '../../../lib/asyncHandler';
import Creature, { CreatureKind } from '../../../models/Creature';

const CreaturesApi = Router();

CreaturesApi.route('/')
	.get(
		asyncHandler(async (_req, res) => {
			// const { offset = '0', limit = '100' } = req.query;

			const creatureList = [
				new Creature(0, CreatureKind.Human, 'Artem', 'Well, hello there!'),
				new Creature(1, CreatureKind.Dog, 'Clifford', 'Woof!'),
			];
			return res.status(200).json(creatureList);
		}),
	)
	.post(
		asyncHandler(async (_req, res) => {
			const creature = new Creature(0, CreatureKind.Human, 'Artem', 'Well, hello there!');

			res.status(200).json(creature);
		}),
	);

CreaturesApi.route('/*')
	.get(
		asyncHandler(async (_req, res) => {
			const creature = new Creature(0, CreatureKind.Human, 'Artem', 'Well, hello there!');
			return res.status(200).json(creature);
		}),
	)
	.post(
		asyncHandler(async (_req, res) => {
			const creature = new Creature(0, CreatureKind.Human, 'Artem', 'Well, hello there!');
			return res.status(200).json(creature);
		}),
	);

export default CreaturesApi;