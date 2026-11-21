import { BUSINESS, fullAddress } from '#lib/content/business.js'
import type { Booking } from '#lib/types.js'
import { endOfSlot } from '#lib/utils/slots.js'

/*
 * Calendar file (.ics) of a booking, to add it to any agenda (Google, Apple, Outlook). Local times, no time zone
 * conversion: the workshop and the customer are in the same place.
 */
const stamp = (date: string, hour: string): string => `${date.replaceAll('-', '')}T${hour.replace(':', '')}00`

const escape = (text: string): string => text.replace(/[,;]/g, (match) => String.fromCharCode(92) + match)

const bookingIcs = (booking: Booking): string => [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eclat Auto//Demo//FR',
    'BEGIN:VEVENT',
    `UID:${booking.id}@eclat-auto.example`,
    `DTSTAMP:${stamp(booking.date, booking.slot)}`,
    `DTSTART:${stamp(booking.date, booking.slot)}`,
    `DTEND:${stamp(booking.date, endOfSlot(booking.slot, booking.slots))}`,
    `SUMMARY:${escape(`${BUSINESS.name} : ${booking.serviceName}`)}`,
    `LOCATION:${escape(fullAddress)}`,
    `DESCRIPTION:${escape(`Référence ${booking.reference}. Véhicule : ${booking.vehicleModel}.`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
].join('\r\n')

// Link address of the file, built in the browser (nothing is sent anywhere)
export const bookingIcsHref = (booking: Booking): string => `data:text/calendar;charset=utf-8,${encodeURIComponent(bookingIcs(booking))}`
