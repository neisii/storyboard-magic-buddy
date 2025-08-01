import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export interface FilterState {
  status: string[];
  maxParticipants: number;
}

interface FilterSectionProps {
  isVisible: boolean;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export const FilterSection = ({ isVisible, filters, onFiltersChange, onClearFilters }: FilterSectionProps) => {
  const [localParticipants, setLocalParticipants] = useState(filters.maxParticipants === 999 ? '' : filters.maxParticipants.toString());

  const statusOptions = [
    { value: 'active', label: '진행중' },
    { value: 'ended', label: '종료됨' },
    { value: 'paused', label: '대기중' }
  ];

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    onFiltersChange({
      ...filters,
      status: newStatus
    });
  };

  const handleParticipantsChange = (value: string) => {
    setLocalParticipants(value);
    const numValue = parseInt(value) || 999;
    if (numValue >= 1) {
      onFiltersChange({
        ...filters,
        maxParticipants: numValue
      });
    }
  };

  const getStatusLabel = (status: string) => {
    return statusOptions.find(option => option.value === status)?.label || status;
  };

  if (!isVisible) return null;

  return (
    <Card className="mb-6 bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">필터</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              필터 초기화
            </Button>
          </div>

          <div className="space-y-4">
            {/* 토론 상태 필터 */}
            <div>
              <Label className="text-sm font-medium mb-2 block">토론 상태</Label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant={filters.status.includes(option.value) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => handleStatusToggle(option.value)}
                  >
                    {option.label}
                    {filters.status.includes(option.value) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 참여자 수 필터 */}
            <div>
              <Label htmlFor="participants" className="text-sm font-medium mb-2 block">
                최대 참여자 수
              </Label>
              <Input
                id="participants"
                type="number"
                min="1"
                value={localParticipants}
                onChange={(e) => handleParticipantsChange(e.target.value)}
                placeholder="참여자 수를 입력하세요"
                className="w-32 bg-background/50"
              />
            </div>

            {/* 적용된 필터 표시 */}
            {(filters.status.length > 0 || filters.maxParticipants !== 999) && (
              <div>
                <Label className="text-sm font-medium mb-2 block">적용된 필터</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.status.map((status) => (
                    <Badge key={status} variant="secondary" className="gap-1">
                      {getStatusLabel(status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                        onClick={() => handleStatusToggle(status)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.maxParticipants !== 999 && (
                    <Badge variant="secondary" className="gap-1">
                      최대 {filters.maxParticipants}명
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                        onClick={() => handleParticipantsChange('999')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};