import React from 'react';
import {
  Label,
  Button,
  Group,
  Dialog,
  DatePicker,
  DateInput,
  DateSegment,
  TimeField,
  Calendar,
  CalendarGrid,
  CalendarCell,
  Heading,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  Popover,
} from 'react-aria-components';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDisplayDateTime } from '../utils/formatters';
import type { DateTimeFieldProps } from '../types/search.types';

export function DateTimeField({ label, value, onChange, timeLabel, minValue }: DateTimeFieldProps) {
  return (
    <div style={styles.field}>
      <Label>{label}</Label>
      <div style={styles.dateTimeWrapper}>
        <DatePicker 
          aria-label="Select a timeframe"
          value={value} 
          onChange={onChange}
          granularity="minute"
          minValue={minValue}
        >
          <Group style={styles.datePickerGroup}>
            {value && formatDisplayDateTime(value)}
            
            <Button style={styles.calendarButton} aria-label="Open calendar">
              <CalendarIcon size={18} />
            </Button>
          </Group>
          <Popover style={styles.calendarPopover}>
            <Dialog style={styles.calendarDialog}>
              <Calendar>
                <header style={styles.calendarHeader}>
                  <Button slot="previous" style={styles.navButton} aria-label="Previous month">
                    <ChevronLeft size={20} />
                  </Button>
                  <Heading style={styles.calendarHeading} />
                  <Button slot="next" style={styles.navButton} aria-label="Next month">
                    <ChevronRight size={20} />
                  </Button>
                </header>
                <CalendarGrid style={styles.calendarGrid}>
                  <CalendarGridHeader>
                    {(day) => <CalendarHeaderCell style={styles.calendarHeaderCell}>{day}</CalendarHeaderCell>}
                  </CalendarGridHeader>
                  <CalendarGridBody>
                    {(date) => <CalendarCell date={date} style={styles.calendarCell} />}
                  </CalendarGridBody>
                </CalendarGrid>
              </Calendar>
              <div style={styles.timeSection}>
                <TimeField 
                  value={value} 
                  onChange={onChange}
                  hourCycle={24}
                  minValue={minValue}
                >
                  <Label style={styles.timeLabel}>{timeLabel}</Label>
                  <DateInput style={styles.timeInput}>
                    {(segment) => <DateSegment segment={segment} />}
                  </DateInput>
                </TimeField>
              </div>
            </Dialog>
          </Popover>
        </DatePicker>
      </div>
    </div>
  );
}

const styles = {
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    minWidth: '160px',
  },
  dateTimeWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  datePickerGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    position: 'relative' as const,
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    whiteSpace: 'nowrap' as const,
    height: '40px',
  },
  dateInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    whiteSpace: 'nowrap' as const,
    display: 'flex',
    gap: '4px',
  },
  calendarButton: {
    padding: '4px',
    minWidth: 'auto',
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarPopover: {
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '8px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    minWidth: '320px',
    maxWidth: '380px',
  },
  calendarDialog: {
    outline: 'none',
  },
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  calendarHeading: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  },
  navButton: {
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    color: '#6b7280',
    minWidth: 'auto',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarGrid: {
    borderSpacing: '4px',
    width: '100%',
  },
  calendarHeaderCell: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center' as const,
    padding: '8px',
  },
  calendarCell: {
    fontSize: '14px',
  },
  timeSection: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  timeLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
    display: 'block',
  },
  timeInput: {
    display: 'flex',
    gap: '4px',
    padding: '12px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    maxWidth: '100%',
    justifyContent: 'center',
  },
};