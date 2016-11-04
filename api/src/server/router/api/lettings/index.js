import { Router } from 'express';
import Letting from '../../../../models/Letting';
import { send200 } from '../responses';
import { auth } from '../middlewares';

const lettingsRouter = new Router();

lettingsRouter.route('/')
.get((req, res, next) => {
    Letting.find({})
    .then((lettings) => send200(res, {
        lettings
    }))
    .catch(next);
})
.post(auth, (req, res, next) => {
    new Letting(req.body).save()
    .then((letting) =>
        send200(res, {
            letting
        })
    )
    .catch(next);
});

lettingsRouter.route('/:lettingId')
.get((req, res, next) =>
    Letting.findById(req.params.lettingId)
    .then((letting) =>
        send200(res, {
            letting
        })
    )
    .catch(next)
)
.put(auth, (req, res, next) => {
    Letting.findById(req.params.lettingId)
    .then((letting) =>
        Object.assign(letting, req.body).save()
        .then((lettingUpdated) =>
            send200(res, {
                letting: lettingUpdated
            })
        )
    )
    .catch(next);
})
.delete(auth, (req, res, next) => {
    Letting.remove({
        _id: req.params.lettingId
    })
    .then((letting) =>
        send200(res, {
            letting
        })
    )
    .catch(next);
});

export default lettingsRouter;