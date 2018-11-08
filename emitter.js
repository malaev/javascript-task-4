'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let events = new Map();

    return {

        /*
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */
        on: function (event, context, handler) {
            if (!events.has(event)) {
                events.set(event, []);
            }
            events.get(event).push({
                context: context,
                handler: handler
            });

            return this;
        },

        /*
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            for (let key of events.keys()) {
                if (key === event || key.startsWith(event + '.')) {
                    events.set(event, events.get(event)
                        .filter(person => person.context !== context));
                }
            }

            return this;
        },

        /*
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            let actionsOrder = [];
            while (event !== '') {
                actionsOrder.push([]);
                if (events.has(event)) {
                    events.get(event)
                        .forEach(ev => actionsOrder[0].push(ev));
                }
                event = event.substring(0, event.lastIndexOf('.'));
            }
            actionsOrder.reverse();
            actionsOrder.forEach(actions => actions.forEach(ev => ev.handler.call(ev.context)));

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
